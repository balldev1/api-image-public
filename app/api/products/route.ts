import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const products = await prisma.product.findMany();

        // ดึงข้อมูล categories ที่สัมพันธ์กัน
        const productsWithCategories = await Promise.all(products.map(async (product) => {
            let categories = [];
            if (product.categories && product.categories.length > 0) {
                categories = await prisma.category.findMany({
                    where: {
                        id: {
                            in: product.categories
                        }
                    }
                });
            }
            return {
                ...product,
                categories
            };
        }));

        console.log('Products:', productsWithCategories);
        return NextResponse.json(productsWithCategories);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
