import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  Grid, 
  List, 
  X, 
  RotateCcw, 
  Filter 
} from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { CATEGORIES } from '../data/coursesData';
import { CourseCard } from '../components/course/CourseCard';

export const CoursesPage = () => {
  const { courses } = useCourse();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialFilter = searchParams.get('filter') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState(initialFilter === 'free' ? 'free' : 'all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const prevParamsStr = useRef(searchParams.toString());
  useEffect(() => {
    const currentStr = searchParams.toString();
    if (prevParamsStr.current !== currentStr) {
      prevParamsStr.current = currentStr;
      const s = searchParams.get('search');
      if (s !== null) setSearchQuery(s);
      const cat = searchParams.get('category');
      if (cat !== null) setSelectedCategory(cat);
      const filt = searchParams.get('filter');
      if (filt === 'free') setSelectedPrice('free');
    }
  }, [searchParams]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedRating('all');
    setSelectedPrice('all');
    setSortBy('popular');
    setSearchParams({});
  };

  const processedCourses = useMemo(() => {
    let result = [...courses];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.instructor.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(c => c.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedLevel !== 'all') {
      result = result.filter(c => c.level.toLowerCase() === selectedLevel.toLowerCase());
    }

    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating);
      result = result.filter(c => c.rating >= minRating);
    }

    if (selectedPrice === 'free') {
      result = result.filter(c => c.price === 0);
    } else if (selectedPrice === 'paid') {
      result = result.filter(c => c.price > 0);
    }

    result.sort((a, b) => {
      if (sortBy === 'popular') return b.studentsEnrolled - a.studentsEnrolled;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'duration') return b.totalDurationHours - a.totalDurationHours;
      return 0;
    });

    return result;
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedRating, selectedPrice, sortBy]);

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedLevel !== 'all' || selectedRating !== 'all' || selectedPrice !== 'all';

  const renderFilterControls = () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <span className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <SlidersHorizontal size={16} /> Filters
        </span>
        {hasActiveFilters && (
          <button onClick={handleResetFilters} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
            Reset All
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Category</h4>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-indigo-500">
            <input 
              type="radio" 
              name="catFilter" 
              checked={selectedCategory === 'all'} 
              onChange={() => setSelectedCategory('all')} 
              className="accent-indigo-600 w-4 h-4 cursor-pointer"
            />
            <span>All Categories ({courses.length})</span>
          </label>
          {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
            <label key={cat.id} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-indigo-500">
              <input 
                type="radio" 
                name="catFilter" 
                checked={selectedCategory.toLowerCase() === cat.name.toLowerCase()} 
                onChange={() => setSelectedCategory(cat.name)} 
                className="accent-indigo-600 w-4 h-4 cursor-pointer"
              />
              <span>{cat.name} ({courses.filter(c => c.category === cat.name).length})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Level */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Difficulty Level</h4>
        <div className="flex flex-col gap-2">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
            <label key={lvl} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-indigo-500">
              <input 
                type="radio" 
                name="lvlFilter" 
                checked={selectedLevel === lvl} 
                onChange={() => setSelectedLevel(lvl)} 
                className="accent-indigo-600 w-4 h-4 cursor-pointer"
              />
              <span>{lvl === 'all' ? 'All Levels' : lvl}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Rating</h4>
        <div className="flex flex-col gap-2">
          {[
            { val: 'all', label: 'Any Rating' },
            { val: '4.9', label: '4.9 ★ and above' },
            { val: '4.8', label: '4.8 ★ and above' },
            { val: '4.5', label: '4.5 ★ and above' }
          ].map(r => (
            <label key={r.val} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-indigo-500">
              <input 
                type="radio" 
                name="ratingFilter" 
                checked={selectedRating === r.val} 
                onChange={() => setSelectedRating(r.val)} 
                className="accent-indigo-600 w-4 h-4 cursor-pointer"
              />
              <span>{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Pricing in INR */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Pricing (₹)</h4>
        <div className="flex flex-col gap-2">
          {[
            { val: 'all', label: 'All Courses' },
            { val: 'free', label: 'Free / मुफ़्त (₹0)' },
            { val: 'paid', label: 'Premium Masterclasses' }
          ].map(p => (
            <label key={p.val} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-indigo-500">
              <input 
                type="radio" 
                name="priceFilter" 
                checked={selectedPrice === p.val} 
                onChange={() => setSelectedPrice(p.val)} 
                className="accent-indigo-600 w-4 h-4 cursor-pointer"
              />
              <span>{p.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        {/* Header with background image */}
        <div className="relative p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white mb-8 overflow-hidden shadow-xl">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none scale-105"
            style={{ backgroundImage: `url('/assets/tech_campus_bg.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
              JP Academy Course Directory
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
              Explore <span className="bg-gradient-to-r from-amber-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">Tech &amp; AI Masterclasses</span>
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Curated by top software architects and engineering leaders from Bengaluru, Chennai, and Hyderabad.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm sticky top-24">
            {renderFilterControls()}
          </aside>

          {/* Main Catalog Area */}
          <main className="lg:col-span-9 flex flex-col gap-6">
            {/* Top Toolbar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search Box */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 w-full sm:w-80">
                <Search size={16} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search courses, instructors, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-transparent text-slate-900 dark:text-white focus:outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Toolbar Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Filter size={14} /> Filters
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="hidden sm:inline">Sort:</span>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="duration">Longest Duration</option>
                  </select>
                </div>

                <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-indigo-500 shadow-sm' : 'text-slate-500'}`}
                    title="Grid"
                  >
                    <Grid size={15} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-indigo-500 shadow-sm' : 'text-slate-500'}`}
                    title="List"
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Chips */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-slate-400">Active:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-medium">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="cursor-pointer"><X size={12} /></button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-medium">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')} className="cursor-pointer"><X size={12} /></button>
                  </span>
                )}
                {selectedLevel !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-medium">
                    {selectedLevel}
                    <button onClick={() => setSelectedLevel('all')} className="cursor-pointer"><X size={12} /></button>
                  </span>
                )}
                {selectedPrice !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-medium">
                    {selectedPrice === 'free' ? 'Free (₹0)' : 'Paid'}
                    <button onClick={() => setSelectedPrice('all')} className="cursor-pointer"><X size={12} /></button>
                  </span>
                )}
                <button onClick={handleResetFilters} className="text-indigo-500 hover:underline font-semibold ml-1 cursor-pointer">
                  Clear all
                </button>
              </div>
            )}

            <div className="text-xs text-slate-500">
              Showing <strong className="text-slate-900 dark:text-white font-bold">{processedCourses.length}</strong> of {courses.length} masterclasses
            </div>

            {/* Courses List / Grid */}
            {processedCourses.length > 0 ? (
              <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                {processedCourses.map(course => (
                  <CourseCard key={course.id} course={course} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl">
                <Search size={44} className="mx-auto text-slate-400 mb-3" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No courses match your filter criteria</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-6">
                  Try adjusting keywords or resetting category filters to browse all masterclasses.
                </p>
                <button onClick={handleResetFilters} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer">
                  <RotateCcw size={14} /> Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setMobileFilterOpen(false)}>
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Filter Courses</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>
            {renderFilterControls()}
            <button 
              onClick={() => setMobileFilterOpen(false)} 
              className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              Apply Filters ({processedCourses.length} Results)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
