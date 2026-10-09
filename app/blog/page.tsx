import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { BookOpen, Clock, User, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Security Knowledge Base & Technical Guides',
  description: 'Expert surveillance engineering articles by MUKIZA Richard and the MTS technical team: IP vs Analog cameras, H.265+ storage calculation, biometrics, and warehouse defense.',
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-mts-navy via-mts-dark to-slate-950 rounded-2xl p-8 sm:p-12 border border-mts-teal-light/40 shadow-2xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mts-teal-dark/50 text-mts-teal-glow text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-mts-gold" />
            <span>MTS Technical Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Surveillance & Physical Security Guides
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Written by <strong>MUKIZA Richard</strong> and our field engineers. Learn how to calculate hard drive storage, 
            choose between IP and analog CCTV, and configure biometric access control to ISO standards.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="group bg-mts-navy/70 border border-slate-800 hover:border-mts-teal-light/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-glow-teal transition-all flex flex-col justify-between"
          >
            <div>
              <Link href={`/blog/${post.slug}`} className="relative aspect-[16/9] block overflow-hidden bg-slate-950">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-mts-dark/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-extrabold uppercase text-mts-gold border border-slate-700">
                  {post.category}
                </div>
              </Link>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-mts-teal-light" />
                    <span>{post.author}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`} className="block">
                  <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-mts-teal-glow transition leading-snug">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-800/80 mt-2">
              <Link
                href={`/blog/${post.slug}`}
                className="text-xs text-mts-gold font-bold flex items-center gap-1.5 group-hover:translate-x-1 transition"
              >
                <span>Read Full Technical Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
