import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import styles from './Carousel.module.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from '@mui/material/IconButton';

type Props = {
  items: JSX.Element[];
};

const mainItems = (items: JSX.Element[]) => {
  return items.map((item, i: number) => (
    <div key={i + 'mainGallery'} className={styles.mainGalleryBox}>
      {item}
    </div>
  ));
};

//make thumbnails
const thumbItems = (
  items: JSX.Element[],
  [setThumbIndex, setThumbAnimation]: [
    React.Dispatch<React.SetStateAction<number>>,
    React.Dispatch<React.SetStateAction<boolean>>
  ]
) => {
  return items.map((item, i: number) => (
    <div
      key={i}
      className={styles.thumb}
      onClick={() => (setThumbIndex(i), setThumbAnimation(true))}
    >
      {item}
    </div>
  ));
};

const Carousel = ({ items }: Props) => {
  const [mainIndex, setMainIndex] = useState(0);
  const [mainAnimation, setMainAnimation] = useState(false);
  const [thumbIndex, setThumbIndex] = useState(0);
  const [thumbAnimation, setThumbAnimation] = useState(false);
  const [thumbs] = useState(
    thumbItems(items, [setThumbIndex, setThumbAnimation])
  );

  const slideNext = () => {
    if (!thumbAnimation && thumbIndex < thumbs.length - 1) {
      setThumbAnimation(true);
      setThumbIndex(thumbIndex + 1);
    }
  };

  const slidePrev = () => {
    if (!thumbAnimation && thumbIndex > 0) {
      setThumbAnimation(true);
      setThumbIndex(thumbIndex - 1);
    }
  };

  const syncMainBeforeChange = (e: any) => {
    setMainAnimation(true);
  };

  const syncMainAfterChange = (e: any) => {
    setMainAnimation(false);

    if (e.type === 'action') {
      setThumbIndex(e.item);
      setThumbAnimation(false);
    } else {
      setMainIndex(thumbIndex);
    }
  };

  const syncThumbs = (e: any) => {
    setThumbIndex(e.item);
    setThumbAnimation(false);

    if (!mainAnimation) {
      setMainIndex(e.item);
    }
  };

  return (
    <>
      <AliceCarousel
        key="mainGallery"
        activeIndex={mainIndex}
        animationType="slide"
        animationDuration={800}
        disableDotsControls
        disableButtonsControls
        items={mainItems(items)}
        mouseTracking={!thumbAnimation}
        onSlideChange={syncMainBeforeChange}
        onSlideChanged={syncMainAfterChange}
        touchTracking={!thumbAnimation}
      />

      <div className={styles.thumbs} key="thumbs">
        <AliceCarousel
          activeIndex={thumbIndex}
          autoWidth
          disableDotsControls
          disableButtonsControls
          items={thumbs}
          mouseTracking={false}
          onSlideChanged={syncThumbs}
          touchTracking={!mainAnimation}
        />
        <IconButton
          aria-label="gallery previous button"
          className={styles.btnPrev}
          onClick={slidePrev}
        >
          <NavigateBeforeIcon fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="gallery next button"
          className={styles.btnNext}
          onClick={slideNext}
        >
          <NavigateNextIcon fontSize="large" />
        </IconButton>
      </div>
    </>
  );
};

export default Carousel;
