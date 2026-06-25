'use client';

import { ArrowDown } from 'lucide-react';

interface ScrollToBottomProps {
    visible: boolean;
    onClick: () => void;
}

export default function ScrollToBottom({ visible, onClick }: ScrollToBottomProps) {
    return (
        // h-0 zero-height in-flow anchor; button floats up via `bottom-3`
        <div className="relative h-0 overflow-visible z-20">
            <button
                onClick={onClick}
                className={`absolute bottom-3 left-1/2 -translate-x-1/2 p-2 rounded-full
          bg-white/90 backdrop-blur-sm border border-[#e5e7eb] shadow-[0_2px_12px_rgba(0,0,0,0.08)]
          hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:scale-105
          text-[#9ca3af] hover:text-[#374151] transition-all duration-200
          ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                title="Scroll to bottom"
            >
                <ArrowDown size={16} />
            </button>
        </div>
    );
}
