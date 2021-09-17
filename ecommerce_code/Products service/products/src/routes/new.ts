import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest, Decrypted } from '@ngatickets/common';
import { Product } from '../models/product';
import { ProductCreatedPublisher } from '../events/publishers/product-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { encode } from '../service/ecryptData';
import { randomBytes } from 'crypto';

const router = express.Router();

router.post(
    '/api/products',
    requireAuth,
    [
        body('iv'),
        body('ephemPublicKey'),
        body('ciphertext'),
        body('mac')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        Decrypted.decode(req.body).then(async (result) => {
            const { title, price } = result;

            const product = Product.build({
                title,
                price,
                userId: req.currentUser!.id,
            });
            await product.save();

            //encrypt
            let message = {
                id: product.id,
                title: product.title,
                price: product.price,
                userId: product.userId,
                version: product.version,
            }
            var encrypt = await encode(message)

            new ProductCreatedPublisher(natsWrapper.client).publish(encrypt);

            res.status(201).json({
                message: "Created product success",
            });
        });
    }
);

export { router as createProductRouter };
