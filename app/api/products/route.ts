// pages/api/products.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {


        const categories = await prisma.category.findMany({
            where: {
                parent_id: '668a54d817eead563973c395',
            },
        });

        return NextResponse.json({  categories });
    } catch (error) {
        NextResponse.json({ error: 'Failed to fetch data' });
    }
}
