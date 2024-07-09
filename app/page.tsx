'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [imageProduct, setImageProduct] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const id = '66876abe6a59206913c3e132'; // ใส่ id ที่ต้องการ

  useEffect(() => {
    const fetchImageFilenames = async () => {
      try {
        const response = await fetch(`/api/images?id=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setImageProduct(data);
      } catch (error) {
        setError('Failed to fetch images');
        console.error('Error fetching images:', error);
      }
    };

    fetchImageFilenames();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div>
        {imageProduct.map((filename, index) => (
            <Image
                key={index}
                src={`/${id}/${filename}`} // ใช้ id ที่ระบุ
                alt={filename}
                width={80}
                height={80}
                className="w-20 h-20"
            />
        ))}
      </div>
  );
}
