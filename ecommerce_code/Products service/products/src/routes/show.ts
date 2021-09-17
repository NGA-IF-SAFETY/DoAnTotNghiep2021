import express, { Request, Response } from 'express';
import { Product } from '../models/product'; 
import { encodeMessage } from '../service/encryptedClient';
const router = express.Router();
router.get('/api/products/:id', async (req: Request, res: Response) => {
    if(req.params.id && req.params.id.length !== 24){
        return res.status(201).json({ errors: "Product Not Found!!"})
    }
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(201).json({ errors: " Product Not Found!!"})
    }
    const encryptedProduct = await encodeMessage(product);

    res.status(200).json({
        message : "Get products/[id]", 
        encryptedProduct
    });
});

export { router as showProductRouter };