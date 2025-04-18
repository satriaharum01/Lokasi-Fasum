import React from 'react';
import '../layouts/css/public/wp_index.css'

function ProductItemV2({ data, isColored }) {
  return (
    <>
      <div className="bs">
        <div className="bsx">
          <a href={data.link} title={data.title}>
            <div className="limit">
              <div className="ply"></div>
              <span className={`type ${data.type}`}>{data.type}</span>
              {isColored && (
                <span className="colored">
                  <i className="fas fa-palette"></i> Warna
                </span>
              )}
              <img
                src={data.cover_image ? `img/comics/${data.cover_image}` : 'img/comics/default.jpg'}
                className="ts-post-image"
                loading="lazy"
                title={data.title}
                alt={data.title}
                width="399"
                height="532"
              />
            </div>
            <div className="bigor">
              <div className="tt">{data.title}</div>
              <div className="adds">
                <div className="epxs">{(data.chapter ?? 'Chapter 0')}</div>
                <div className="rt">
                  <div className="rating">
                    <div className="rating-prc">
                      <div className="rtp">
                        <div className="rtb">
                          <span style={{ width: `${data.score * 10}%` }}></span>
                        </div>
                      </div>
                    </div>
                    <div className="numscore">{(data.rating ?? 0).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default ProductItemV2;
