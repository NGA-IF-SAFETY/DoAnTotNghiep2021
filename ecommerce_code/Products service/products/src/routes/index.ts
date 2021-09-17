import express, { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';
import { encodeMessage } from '../service/encryptedClient';

const router = express.Router();

router.get('/api/products', async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({
        orderId: undefined,
    });

    try {
        const encryptedProducts = await encodeMessage(products);
    
        res.status(201).json({
            message: "Get all products success",
            products: encryptedProducts
        });

    } catch (error) {
        res.json({ Message: "Something error" });

    }

});

export { router as indexProductRouter };