import React from 'react';
import '../layouts/css/public/wp_index.css'

function ProductItemV3({ data, isColored }) {
  return (
    <>
      <div className='utao styletwo'>
        <div className='uta'>
          <div className="imgu">
            <a href={data.link} title={data.title}>
              <img
                src={data.cover_image ? `img/comics/${data.cover_image}` : 'img/comics/default.jpg'}
                className="ts-post-image"
                loading="lazy"
                title={data.title}
                alt={data.title} width="232" height="300"
              />
            </a>
          </div>
          <div className="luf">
            <a
              className="series"
              href="https://komiku.one/manga/181024-nano-machine/"
              title="Nano Machine"
            >
              <h4 className='text-white'>{data.title}</h4>
            </a>
            <ul className="Manhwa">
              <li>
                <a href="https://komiku.one/nano-machine-chapter-255/">
                  Chapter 255
                </a>
                <span>2 menit lalu</span>
              </li>
              <li>
                <a href="https://komiku.one/nano-machine-chapter-254/">
                  Chapter 254
                </a>
                <span>1 minggu lalu</span>
              </li>
              <li>
                <a href="https://komiku.one/nano-machine-chapter-253/">
                  Chapter 253
                </a>
                <span>2 minggu lalu</span>
              </li>
            </ul>
            <span className="statusind Ongoing">
              <i className="fas fa-circle"></i> Ongoing
            </span>
          </div>
        </div>
      </div >
    </>
  );
}

export default ProductItemV3;
