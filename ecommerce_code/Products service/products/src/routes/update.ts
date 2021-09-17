import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Product } from '../models/product';
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError
} from '@ngatickets/common';

import { ProductUpdatedPublisher } from '../events/publishers/product-updated-publisher';
import { natsWrapper } from '../nats-wrapper';
import { encode } from '../service/ecryptData';

const router = express.Router();

router.put(
    '/api/products/:id',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be provided and must be greater than 0'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            // throw new NotFoundError();
            return res.status(201).json({ errors: " Product Not Found!!"})
        }

        if (product.userId !== req.currentUser!.id) {
            // throw new NotAuthorizedError();
            return res.status(201).json({ errors: "Not Authorized!!"})
        }

        product.set({
            title: req.body.title,
            price: req.body.price,
        });
        await product.save();

        // encrypted 
        let message = {
            id: product.id,
            title: product.title,
            price: product.price,
            userId: product.userId,
            version: product.version,
        }

        var encrypt = await encode(message)

        new ProductUpdatedPublisher(natsWrapper.client).publish(encrypt);

        res.json({
            message: "Update product success",
            product
        });
    }
);

export { router as updateProductRouter };
