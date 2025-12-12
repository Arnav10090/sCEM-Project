import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Camera } from 'lucide-react';

interface ImagePanelProps {
  title: string;
  images?: string[];
}

const ImagePanel = ({ title, images = [] }: ImagePanelProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (images.length === 0) return;
    
    if (direction === 'left' || direction === 'up') {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    } else {
      setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-2">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Camera className="w-3 h-3 text-industrial-red" />
        <h3 className="text-xs font-medium text-industrial-red">{title}</h3>
      </div>

      {/* Image Container with Navigation */}
      <div className="relative">
        {/* Top Navigation */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <button 
            onClick={() => navigate('up')}
            className="nav-circle"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        {/* Left Navigation */}
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <button 
            onClick={() => navigate('left')}
            className="nav-circle"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Image Area */}
        <div className="h-40 bg-muted border border-border rounded flex items-center justify-center overflow-hidden">
          {images.length > 0 ? (
            <img
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-muted-foreground">
              <Camera className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Equipment Image</p>
              <p className="text-xs opacity-75">No image available</p>
            </div>
          )}
        </div>

        {/* Right Navigation */}
        <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10">
          <button 
            onClick={() => navigate('right')}
            className="nav-circle"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
          <button 
            onClick={() => navigate('down')}
            className="nav-circle"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image Counter */}
      {images.length > 0 && (
        <div className="text-center mt-4 text-xs text-muted-foreground">
          Image {currentIndex + 1} of {images.length}
        </div>
      )}
    </div>
  );
};

export default ImagePanel;
