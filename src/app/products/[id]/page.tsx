// src/app/products/[id]/page.tsx

// { params } という引数で、動的な情報を受け取れる
export default function ProductDetailPage({ params }: { params: { id: string } }) {
    return (
      <div>
        <h1>商品詳細ページ</h1>
        <p>この商品のIDは: {params.id} です。</p>
      </div>
    );
  }

  