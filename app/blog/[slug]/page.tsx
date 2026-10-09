'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar, 
  Share2, 
  ShieldCheck, 
  Tag,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { blogPosts } from '@/data/blog';

export default function SingleBlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return notFound();
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Knowledge Base</span>
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        <span className="bg-mts-teal-dark text-mts-teal-glow px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-mts-teal-light/30">
          {post.category}
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <User className="w-4 h-4 text-mts-gold" />
              <span>{post.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.publishedDate}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Guide</span>
          </button>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        <Image src={post.coverImage} alt={post.title} fill sizes="100vw" className="object-cover" priority />
      </div>

      {/* Article Content */}
      <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6 pt-4 whitespace-pre-line">
        {post.content}
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 font-semibold uppercase">Tags:</span>
        {post.tags.map((tag, i) => (
          <span key={i} className="text-xs bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      {/* Author Bio Box */}
      <div className="bg-mts-navy/90 border border-mts-gold/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-slate-950 border-2 border-mts-gold flex items-center justify-center text-mts-gold font-bold text-xl shrink-0">
          MR
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] uppercase font-bold text-mts-gold tracking-wider">Article Contributor</span>
          <h3 className="text-base font-bold text-white">{post.author}</h3>
          <p className="text-xs text-slate-300">{post.authorRole}</p>
          <p className="text-[11px] text-slate-400 pt-1">
            Certified technical authority specializing in Hikvision, Dahua, and ZKTeco enterprise physical infrastructure.
          </p>
        </div>
      </div>
    </article>
  );
}
