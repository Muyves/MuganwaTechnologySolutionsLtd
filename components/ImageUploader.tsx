'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Link as LinkIcon, 
  Loader2,
  RefreshCw
} from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = 'Product / Item Photo',
  helperText = 'Upload from your phone, laptop, or camera (PNG, JPG, WEBP, up to 10MB)'
}: ImageUploaderProps) {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress image on client side if large (to keep page snappy & fast)
  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      // If already under 1.5MB, keep as is
      if (file.size <= 1.5 * 1024 * 1024) {
        resolve(file);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max 1600px width/height for web catalogs
          const maxDim = 1600;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(file);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
                  type: 'image/webp',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            'image/webp',
            0.85
          );
        };
        img.onerror = () => resolve(file);
      };
      reader.onerror = () => resolve(file);
    });
  };

  const handleProcessFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file (JPEG, PNG, WEBP, HEIC)');
      return;
    }

    setUploadError(null);
    setIsUploading(true);
    setUploadSuccess(false);

    try {
      // Compress if needed
      const fileToUpload = await compressImage(file);

      // Instant preview using client-side FileReader
      const previewReader = new FileReader();
      previewReader.onload = (e) => {
        if (e.target?.result) {
          onChange(e.target.result as string);
        }
      };
      previewReader.readAsDataURL(fileToUpload);

      // Upload to server
      const formData = new FormData();
      formData.append('file', fileToUpload);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && (data.url || data.dataUrl)) {
        // Use server URL or dataUrl
        onChange(data.url || data.dataUrl);
        setUploadSuccess(true);
      } else {
        // If server API fails, we already have client-side base64 preview set!
        setUploadSuccess(true);
      }
    } catch (err: any) {
      console.warn('Upload fallback to client base64 preview:', err);
      // In case server is unreachable, FileReader already set client-side base64
      setUploadSuccess(true);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemovePhoto = () => {
    onChange('');
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-slate-300 font-semibold text-sm">
          {label} <span className="text-red-400">*</span>
        </label>
        
        {/* Toggle between Device Upload and Web URL */}
        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
              mode === 'upload'
                ? 'bg-mts-teal text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>From Device</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
              mode === 'url'
                ? 'bg-mts-teal text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Web URL</span>
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div className="space-y-2">
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {value ? (
            /* PREVIEW CARD */
            <div className="relative rounded-xl border border-slate-700 bg-slate-900/90 p-3 overflow-hidden group">
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
                  <Image
                    src={value}
                    alt="Uploaded hardware preview"
                    fill
                    className="object-contain"
                    unoptimized={value.startsWith('data:')}
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> Photo Attached
                    </span>
                    {uploadSuccess && (
                      <span className="text-xs text-emerald-400 animate-fadeIn">Saved!</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 truncate">
                    Ready for live catalog & quote proposal
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 transition flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Change Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/60 transition flex items-center gap-1.5"
                    >
                      <X className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>

              {isUploading && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center gap-2 text-mts-teal font-semibold text-sm">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Photo...</span>
                </div>
              )}
            </div>
          ) : (
            /* DRAG AND DROP ZONE */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? 'border-mts-teal bg-mts-teal/10 scale-[1.01]'
                  : 'border-slate-700 hover:border-mts-teal/70 bg-slate-900/60 hover:bg-slate-900'
              }`}
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-mts-teal group-hover:scale-110 transition">
                  {isUploading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-mts-teal" />
                  ) : (
                    <Upload className="w-6 h-6 text-mts-teal" />
                  )}
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    {isUploading ? 'Uploading photo...' : 'Click to Upload Photo or Drag & Drop'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {helperText}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
                  <Camera className="w-3 h-3 text-mts-teal" />
                  <span>Supports Camera on Mobile Phone or Laptop Gallery</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* URL INPUT MODE */
        <div className="space-y-2">
          <div className="relative">
            <input
              type="url"
              placeholder="https://images.unsplash.com/... or https://..."
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setUploadError(null);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-sm focus:border-mts-teal focus:outline-none"
            />
          </div>
          {value && (
            <div className="flex items-center gap-3 p-2 bg-slate-900/80 border border-slate-800 rounded-lg">
              <div className="relative w-12 h-12 rounded bg-slate-950 overflow-hidden flex-shrink-0">
                <Image
                  src={value}
                  alt="Preview"
                  fill
                  className="object-contain"
                  onError={() => setUploadError('Could not load image from this URL')}
                />
              </div>
              <div className="text-xs text-slate-300 truncate flex-1">
                Preview loaded from URL
              </div>
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="text-slate-400 hover:text-red-400 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {uploadError && (
        <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-950/30 border border-red-900/50 p-2 rounded-lg">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}
    </div>
  );
}
