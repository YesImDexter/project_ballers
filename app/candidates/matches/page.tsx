'use client';

import { useState, useRef } from 'react';
import AppShell, { CandidateSidebar } from '@/app/candidates/component/AppShell';
import { matchesData, type Match } from '@/app/candidates/data/matches_data';
import { ThumbsDown, ThumbsUp, RotateCcw } from 'lucide-react';

interface SwipedCard {
  id: string;
  action: 'pass' | 'interested';
}

const CelebrationIcon = () => (
  <svg className="w-16 h-16 text-signal-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function MatchesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedCards, setSwipedCards] = useState<SwipedCard[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [hoverOffset, setHoverOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [enterDirection, setEnterDirection] = useState<'left' | 'right' | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const dragStartRef = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isDone = currentIndex >= matchesData.length;

  const currentCard = matchesData[currentIndex];
  const interestedCount = swipedCards.filter((c) => c.action === 'interested').length;
  const passCount = swipedCards.filter((c) => c.action === 'pass').length;

  const handleSwipe = (action: 'pass' | 'interested') => {
    setIsAnimating(true);
    const direction = action === 'interested' ? 1 : -1;
    let offset = 0;
    const interval = setInterval(() => {
      offset += direction * 30;
      setDragOffset(offset);
      if (Math.abs(offset) > 500) {
        clearInterval(interval);
        setSwipedCards([...swipedCards, { id: currentCard.id, action }]);
        setCurrentIndex(currentIndex + 1);
        setDragOffset(0);
        setEnterDirection(direction > 0 ? 'right' : 'left');
        setIsEntering(true);
        setTimeout(() => {
          setIsAnimating(false);
          setIsEntering(false);
          setEnterDirection(null);
        }, 400);
      }
    }, 30);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSwipedCards([]);
    setDragOffset(0);
    setHoverOffset(0);
    setEnterDirection(null);
    setIsEntering(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimating) return;
    setIsDragging(true);
    setHoverOffset(0);
    dragStartRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const diff = e.clientX - dragStartRef.current;
      setDragOffset(diff);
    } else if (cardRef.current && !isDragging) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distFromCenter = e.clientX - centerX;
      const maxDistance = rect.width / 2;
      const normalizedDistance = Math.max(-maxDistance, Math.min(maxDistance, distFromCenter));
      setHoverOffset(normalizedDistance * 0.15);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      handleSwipe(dragOffset > 0 ? 'interested' : 'pass');
    } else {
      setDragOffset(0);
    }
  };

  const handleMouseLeave = () => {
    setHoverOffset(0);
    if (!isDragging) {
      setDragOffset(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    setIsDragging(true);
    setHoverOffset(0);
    dragStartRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - dragStartRef.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      handleSwipe(dragOffset > 0 ? 'interested' : 'pass');
    } else {
      setDragOffset(0);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <AppShell />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Sidebar */}
          <CandidateSidebar />

          {/* Main Content */}
          <div className="col-span-3">
            {isDone ? (
              // Summary Screen
              <div className="bg-secondary rounded-2xl border border-light-border p-12 shadow-sm min-h-96 flex flex-col items-center justify-center text-center">
                <div className="mb-8 flex justify-center">
                  <CelebrationIcon />
                </div>
                <div className="mb-8">
                  <div className="text-4xl font-bold text-accent mb-2">All Done!</div>
                  <p className="text-muted text-lg">You reviewed {matchesData.length} opportunities</p>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-12 w-full max-w-sm">
                  <div className="bg-pastel-green rounded-xl p-6">
                    <div className="text-3xl font-bold text-signal-green mb-1">{interestedCount}</div>
                    <p className="text-sm text-muted">Interested</p>
                  </div>
                  <div className="bg-pastel-red rounded-xl p-6">
                    <div className="text-3xl font-bold text-signal-red mb-1">{passCount}</div>
                    <p className="text-sm text-muted">Passed</p>
                  </div>
                </div>

                <p className="text-muted mb-8 max-w-md">
                  Your interested matches have been saved. Next steps: review detailed match reasons and reach out to companies you are excited about.
                </p>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 bg-accent text-secondary rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  <RotateCcw className="w-5 h-5" />
                  Review Again
                </button>
              </div>
            ) : (
              // Card Stack
              <div className="space-y-6 flex flex-col items-center">
                {/* Progress Bar */}
                <div className="bg-secondary rounded-lg border border-light-border p-4 shadow-sm w-full max-w-md">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-accent">Match {currentIndex + 1} of {matchesData.length}</p>
                    <p className="text-xs text-muted">{interestedCount} interested • {passCount} passed</p>
                  </div>
                  <div className="w-full bg-light-border rounded-full h-1.5">
                    <div
                      className="bg-accent h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${((currentIndex) / matchesData.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Swipeable Card */}
                <div
                  ref={cardRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="cursor-grab active:cursor-grabbing w-full max-w-md relative"
                  style={{
                    perspective: '1000px',
                  }}
                >
                  {/* Left Glow Zone - Red */}
                  <div className="absolute left-0 top-0 bottom-0 z-0 rounded-l-2xl opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    style={{
                      width: isEntering && enterDirection === 'left' ? '100%' : '33.333%',
                      background: 'radial-gradient(ellipse at left center, rgba(185, 28, 28, 0.4), transparent)',
                      filter: 'blur(20px)',
                      transition: isEntering ? 'width 400ms ease-out' : 'none',
                    }}
                  />
                  
                  {/* Right Glow Zone - Green */}
                  <div className="absolute right-0 top-0 bottom-0 z-0 rounded-r-2xl opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    style={{
                      width: isEntering && enterDirection === 'right' ? '100%' : '33.333%',
                      background: 'radial-gradient(ellipse at right center, rgba(5, 150, 105, 0.4), transparent)',
                      filter: 'blur(20px)',
                      transition: isEntering ? 'width 400ms ease-out' : 'none',
                    }}
                  />

                  {/* Left Tap Zone */}
                  <div
                    onClick={() => !isAnimating && handleSwipe('pass')}
                    className="absolute left-0 top-0 bottom-0 w-1/3 z-20 cursor-pointer"
                  />
                  
                  {/* Right Tap Zone */}
                  <div
                    onClick={() => !isAnimating && handleSwipe('interested')}
                    className="absolute right-0 top-0 bottom-0 w-1/3 z-20 cursor-pointer"
                  />

                  <div
                    className="bg-secondary rounded-2xl border border-light-border p-8 shadow-sm transition-transform duration-150 relative z-10"
                    style={{
                      transform: `translateX(${
                        isEntering
                          ? enterDirection === 'right'
                            ? 500
                            : -500
                          : dragOffset + hoverOffset
                      }px) rotateZ(${(dragOffset + hoverOffset) * 0.1}deg)`,
                      opacity: isEntering ? 0 : 1 - Math.abs(dragOffset) / 500,
                      transitionProperty: isEntering ? 'transform, opacity' : 'none',
                      transitionDuration: isEntering ? '400ms' : '0ms',
                      transitionTimingFunction: 'ease-out',
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-pink-400 rounded-xl flex items-center justify-center text-white text-lg font-bold shrink-0">
                          {currentCard.companyLogo}
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-2xl font-bold text-accent truncate">{currentCard.company}</h2>
                          <p className="text-muted text-sm">{currentCard.location}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-4xl font-bold text-signal-green">{currentCard.matchScore}%</div>
                        <p className="text-xs text-muted">Match</p>
                      </div>
                    </div>

                    {/* Role & Type */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-accent mb-2">{currentCard.role}</h3>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-pastel-blue rounded-full text-xs font-medium text-signal-blue capitalize">
                          {currentCard.type}
                        </span>
                      </div>
                    </div>

                    {/* Salary & Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-light-border">
                      <div className="min-w-0">
                        <p className="text-xs text-muted mb-1">Salary Range</p>
                        <p className="font-semibold text-accent truncate">
                          {currentCard.currency} {currentCard.salaryMin.toLocaleString()} - {currentCard.salaryMax.toLocaleString()}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted mb-1">Location</p>
                        <p className="font-semibold text-accent truncate">{currentCard.location}</p>
                      </div>
                    </div>

                    {/* Why It Matched */}
                    <div className="mb-8">
                      <p className="text-xs text-muted mb-2">Why This Match?</p>
                      <div className="bg-pastel-purple rounded-lg p-4 border border-light-border">
                        <p className="text-sm text-accent">{currentCard.why}</p>
                      </div>
                    </div>

                    {/* Description */}
                    {currentCard.description && (
                      <div className="mb-8">
                        <p className="text-xs text-muted mb-2">About the Role</p>
                        <p className="text-sm text-accent leading-relaxed">{currentCard.description}</p>
                      </div>
                    )}

                    {/* Swipe Hint */}
                    <div className="text-center text-xs text-muted">
                      Swipe left to pass • Swipe right to show interest
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center w-full max-w-md">
                  <button
                    onClick={() => handleSwipe('pass')}
                    disabled={isAnimating}
                    className="flex items-center gap-2 px-8 py-3 bg-pastel-red text-signal-red rounded-lg font-medium hover:opacity-90 transition-opacity border border-light-border disabled:opacity-50"
                  >
                    <ThumbsDown className="w-5 h-5" />
                    Pass
                  </button>
                  <button
                    onClick={() => handleSwipe('interested')}
                    disabled={isAnimating}
                    className="flex items-center gap-2 px-8 py-3 bg-pastel-green text-signal-green rounded-lg font-medium hover:opacity-90 transition-opacity border border-light-border disabled:opacity-50"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    Interested
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
