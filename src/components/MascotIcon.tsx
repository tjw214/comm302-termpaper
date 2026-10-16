import React from 'react';

interface MascotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const MascotIcon: React.FC<MascotProps> = ({
  className = '',
  size = 'md',
  animated = false,
}) => {
  const sizeMap = {
    sm: 'w-8 h-9',
    md: 'w-10 h-12',
    lg: 'w-14 h-16',
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${sizeMap[size]} ${
        animated ? 'hover:scale-105 transition-transform cursor-pointer' : ''
      } ${className}`}
    >
      {/* Mascot Main Face Container */}
      <div className="w-8 h-9 bg-[#fcd34d] border-[2.2px] border-[#92400e] rounded-lg relative flex flex-col items-center pt-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
        {/* Cute Spark Hair / Antenna reflection */}
        <div className="absolute top-0.5 right-1 w-1.5 h-1 bg-white/70 rounded-full"></div>

        {/* Eyes */}
        <div className="flex gap-1.5 mt-0.5">
          <div className="w-1.5 h-2 bg-[#451a03] rounded-full relative">
            <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
          </div>
          <div className="w-1.5 h-2 bg-[#451a03] rounded-full relative">
            <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
          </div>
        </div>

        {/* Rosy Cheeks */}
        <div className="w-full flex justify-between px-1 -mt-0.5">
          <div className="w-1 h-0.5 bg-amber-400/80 rounded-full"></div>
          <div className="w-1 h-0.5 bg-amber-400/80 rounded-full"></div>
        </div>

        {/* Happy Smiling Open Mouth */}
        <div className="w-3 h-2 bg-[#b91c1c] border border-[#991b1b] rounded-b-full -mt-0.5 overflow-hidden flex items-end justify-center">
          <div className="w-2 h-1 bg-[#f87171] rounded-t-full"></div>
        </div>
      </div>

      {/* Pointer/Lightning Tail pointing downward */}
      <div
        className="w-0 h-0 -mt-0.5 filter drop-shadow-[0_1.5px_0_#92400e]"
        style={{
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: '9px solid #fcd34d',
        }}
      />
    </div>
  );
};
