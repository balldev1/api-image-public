import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' });
        }

        const imagesDirectory = path.join(process.cwd(), `public/${id}`);

        if (!fs.existsSync(imagesDirectory)) {
            return NextResponse.json({ error: 'Directory not found' });
        }

        //  เก็บชือไฟลที่อยู่ใน folder
        const filenames = fs.readdirSync(imagesDirectory);

        // กำหนดไฟล์ที่ต้องการกรอง
        const validFilenames = ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp'];
        // กรองเฉพาะไฟล์ที่มีชื่อใน filename
        const imageFilenames = filenames.filter(filename => validFilenames.includes(filename));

        if (imageFilenames.length === 0) {
            return NextResponse.json({ message: 'No images found' });
        }

        return NextResponse.json(imageFilenames);

    } catch (error) {
        console.error('Error reading image directory:', error);
        return NextResponse.json({ error: 'Failed to read image directory' },);
    }
}
