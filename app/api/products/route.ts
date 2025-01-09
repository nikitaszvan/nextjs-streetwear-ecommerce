// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { fetchCategoryProducts } from '@/hooks/fetch-products';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (!category) {
      return NextResponse.json({ error: 'PK is required' }, { status: 400 });
    }

    const pk = encodeURIComponent(`CATEGORY#${category}`);
    const data = await fetchCategoryProducts(pk);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}