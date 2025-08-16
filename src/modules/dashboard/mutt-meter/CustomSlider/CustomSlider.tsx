'use client';

import React, { useRef } from 'react';
import { useTheme } from 'next-themes';

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  trackHeight?: number;
  trackBeforeColor?: string;
  trackAfterColor?: string;
  lightModeTrackAfterColor?: string;
  thumbIcon?: React.ReactNode;
  thumbSize?: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  trackHeight = 8,
  trackBeforeColor = '#FFC000', 
  trackAfterColor = '#092522',
  lightModeTrackAfterColor = '#ffffff', 
  thumbIcon,
  thumbSize = 32,
}) => {
  const { theme } = useTheme();
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentTrackAfterColor = theme === 'light' ? lightModeTrackAfterColor : trackAfterColor;

  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.min(Math.max(clickX / rect.width, 0), 1);
    const newValue = Math.round((min + (max - min) * percentage) / step) * step;
    onChange(Number(newValue.toFixed(2)));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={sliderRef}
      onClick={handleDrag}
      className="relative w-full cursor-pointer select-none"
      style={{ height: thumbSize }}
    >
      <div
        className="absolute top-1/2 w-full rounded"
        style={{
          transform: 'translateY(-50%)',
          height: trackHeight,
          backgroundColor: currentTrackAfterColor,
        }}
      />
      <div
        className="absolute top-1/2 rounded"
        style={{
          transform: 'translateY(-50%)',
          width: `${percentage}%`,
          height: trackHeight,
          backgroundColor: trackBeforeColor,
        }}
      />

      <div
        className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white shadow-md border cursor-grab"
        style={{
          left: `calc(${percentage}% - ${thumbSize / 2}px)`,
          width: thumbSize,
          height: thumbSize,
          borderColor: trackBeforeColor,
          borderWidth: 2,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          const moveListener = (e: MouseEvent) => handleDrag({ ...e, clientX: e.clientX } as any);
          const upListener = () => {
            document.removeEventListener('mousemove', moveListener);
            document.removeEventListener('mouseup', upListener);
          };
          document.addEventListener('mousemove', moveListener);
          document.addEventListener('mouseup', upListener);
        }}
      >
        {thumbIcon}
      </div>
    </div>
  );
};

export default CustomSlider;
