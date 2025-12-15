import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageMetadata {
  size: number;
  uploadedAt: Date;
}

interface ImagePanelProps {
  title: string;
  images?: string[];
  onImageUpload?: (file: File) => void;
  showUploadButton?: boolean;
  showImageInfo?: boolean;
}

const ImagePanel = ({ title, images = [], onImageUpload, showUploadButton = false, showImageInfo = false }: ImagePanelProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localImages, setLocalImages] = useState<string[]>(images);
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata[]>(() => {
    return images.map(() => ({
      size: 0,
      uploadedAt: new Date()
    }));
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (localImages.length === 0) return;

    if (direction === 'left' || direction === 'up') {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : localImages.length - 1));
    } else {
      setCurrentIndex((prev) => (prev < localImages.length - 1 ? prev + 1 : 0));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setLocalImages([...localImages, dataUrl]);
      };
      reader.readAsDataURL(file);
      if (onImageUpload) {
        onImageUpload(file);
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-2 flex flex-col h-full flex-1 min-h-0">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 flex-shrink-0">
        <Camera className="w-3 h-3 text-gray-900" />
        <h3 className="text-xs font-medium text-gray-900">{title}</h3>
      </div>

      {/* Image Container with Navigation */}
      <div className="relative flex-1 max-h-48">
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
        <div className="h-full bg-muted border border-border rounded flex items-center justify-center overflow-hidden">
          {localImages.length > 0 ? (
            <img
              src={localImages[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              className="w-full h-full object-contain"
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

      {/* Upload Button */}
      {showUploadButton && (
        <div className="mt-2 flex-shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            size="sm"
            variant="outline"
            className="w-full text-xs"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-3 h-3 mr-1" />
            Upload Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImagePanel;
