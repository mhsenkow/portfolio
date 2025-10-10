"use client";

import { useState } from 'react';
import type { Project } from '@/content/projects';

export type SortOption = 'year-desc' | 'year-asc' | 'title-asc' | 'title-desc';
export type FilterOption = 'all' | 'featured' | 'creative' | 'microsoft' | 'meta' | 'ibm' | 'apple';

interface SortFilterBarProps {
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (filter: FilterOption) => void;
  currentSort: SortOption;
  currentFilter: FilterOption;
  itemCount: number;
  filterCounts?: Record<FilterOption, number>;
}

export function SortFilterBar({ onSortChange, onFilterChange, currentSort, currentFilter, itemCount, filterCounts }: SortFilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: 'year-desc' as const, label: 'Newest first' },
    { value: 'year-asc' as const, label: 'Oldest first' },
    { value: 'title-asc' as const, label: 'A-Z' },
    { value: 'title-desc' as const, label: 'Z-A' },
  ];

  const filterOptions = [
    { value: 'all' as const, label: 'All projects', count: filterCounts?.all || itemCount },
    { value: 'featured' as const, label: 'Featured', count: filterCounts?.featured || 0 },
    { value: 'creative' as const, label: 'Creative work', count: filterCounts?.creative || 0 },
    { value: 'microsoft' as const, label: 'Microsoft', count: filterCounts?.microsoft || 0 },
    { value: 'meta' as const, label: 'Meta', count: filterCounts?.meta || 0 },
    { value: 'ibm' as const, label: 'IBM', count: filterCounts?.ibm || 0 },
    { value: 'apple' as const, label: 'Apple', count: filterCounts?.apple || 0 },
  ];

  return (
    <div className="sort-filter-bar" style={{ 
      padding: 'var(--space-3)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      flexWrap: 'wrap'
    }}>
      {/* Sort dropdown */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <span style={{ fontSize: 'var(--size-1)', color: 'var(--color-muted)', fontWeight: '500' }}>Sort:</span>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          style={{
            padding: 'var(--space-2) var(--space-3)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            background: 'var(--surface-elev)',
            fontSize: 'var(--size-1)',
            color: 'var(--color-text)',
            cursor: 'pointer',
            appearance: 'none',
            paddingRight: 'var(--space-6)',
            minWidth: '140px',
            transition: 'all 0.2s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
          aria-label="Sort projects"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          style={{ 
            position: 'absolute', 
            right: 'var(--space-2)', 
            pointerEvents: 'none',
            color: 'var(--color-muted)'
          }}
          aria-hidden="true"
        >
          <path fill="currentColor" d="M7 10l5 5 5-5z"/>
        </svg>
      </div>

      {/* Filter toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <span style={{ fontSize: 'var(--size-1)', color: 'var(--color-muted)', fontWeight: '500' }}>Filter:</span>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          style={{
            padding: 'var(--space-2) var(--space-3)',
            borderRadius: 'var(--radius-md)',
            border: showFilters ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
            background: showFilters ? 'var(--color-accent)' : 'var(--surface-elev)',
            color: showFilters ? 'var(--color-bg)' : 'var(--color-text)',
            fontSize: 'var(--size-1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            transition: 'all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)',
            fontWeight: '500'
          }}
          aria-label="Toggle filters"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M3 17h18v-2H3v2zm0-5h18V7H3v5zm0-7v2h18V5H3z"/>
          </svg>
          {showFilters ? 'Hide filters' : 'Show filters'}
        </button>
      </div>

      {/* Project count and clear */}
      <div style={{ 
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        fontSize: 'var(--size-1)', 
        color: 'var(--color-muted)'
      }}>
        <span style={{ fontWeight: '500' }}>{itemCount} projects</span>
        {currentFilter !== 'all' && (
          <button
            type="button"
            onClick={() => onFilterChange('all')}
            style={{
              padding: 'var(--space-1) var(--space-2)',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: 'var(--color-muted)',
              color: 'var(--color-bg)',
              fontSize: 'var(--size-0)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              transition: 'all 0.2s ease'
            }}
            aria-label="Clear filters"
          >
            Clear
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        )}
      </div>

      {showFilters && (
        <div style={{
          width: '100%',
          marginTop: 'var(--space-3)',
          padding: 'var(--space-4)',
          background: 'var(--surface-elev)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'var(--space-3)'
        }}>
          {filterOptions.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => onFilterChange(option.value)}
              style={{
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-md)',
                border: currentFilter === option.value ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                background: currentFilter === option.value ? 'var(--color-accent)' : 'var(--surface-card)',
                color: currentFilter === option.value ? 'var(--color-bg)' : 'var(--color-text)',
                fontSize: 'var(--size-1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                textAlign: 'left',
                fontWeight: '500',
                transform: currentFilter === option.value ? 'translateY(-1px)' : 'translateY(0)',
                boxShadow: currentFilter === option.value ? '0 4px 12px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                if (currentFilter !== option.value) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentFilter !== option.value) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                }
              }}
              aria-pressed={currentFilter === option.value}
              aria-label={`Filter by ${option.label}`}
            >
              <span>{option.label}</span>
              {option.count > 0 && (
                <span style={{
                  fontSize: 'var(--size-0)',
                  opacity: 0.7,
                  marginLeft: 'var(--space-2)',
                  fontWeight: '600'
                }}>
                  {option.count}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper functions for sorting and filtering
export function sortProjects(projects: Project[], sort: SortOption): Project[] {
  const sorted = [...projects];
  
  switch (sort) {
    case 'year-desc':
      return sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
    case 'year-asc':
      return sorted.sort((a, b) => (a.year || 0) - (b.year || 0));
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}

export function filterProjects(projects: Project[], filter: FilterOption): Project[] {
  switch (filter) {
    case 'featured':
      return projects.filter(p => p.featured === true);
    case 'creative':
      return projects.filter(p => p.category === 'creative');
    case 'microsoft':
      return projects.filter(p => 
        p.stack?.some(s => s.toLowerCase().includes('microsoft')) ||
        p.details?.entity?.toLowerCase().includes('microsoft') ||
        p.title.toLowerCase().includes('microsoft')
      );
    case 'meta':
      return projects.filter(p => 
        p.stack?.some(s => s.toLowerCase().includes('meta')) ||
        p.details?.entity?.toLowerCase().includes('meta') ||
        p.title.toLowerCase().includes('meta')
      );
    case 'ibm':
      return projects.filter(p => 
        p.stack?.some(s => s.toLowerCase().includes('ibm')) ||
        p.details?.entity?.toLowerCase().includes('ibm') ||
        p.title.toLowerCase().includes('ibm')
      );
    case 'apple':
      return projects.filter(p => 
        p.stack?.some(s => s.toLowerCase().includes('apple')) ||
        p.details?.entity?.toLowerCase().includes('apple') ||
        p.title.toLowerCase().includes('apple')
      );
    case 'all':
    default:
      return projects;
  }
}

export function getFilterCounts(projects: Project[]) {
  return {
    all: projects.length,
    featured: projects.filter(p => p.featured === true).length,
    creative: projects.filter(p => p.category === 'creative').length,
    microsoft: projects.filter(p => 
      p.stack?.some(s => s.toLowerCase().includes('microsoft')) ||
      p.details?.entity?.toLowerCase().includes('microsoft') ||
      p.title.toLowerCase().includes('microsoft')
    ).length,
    meta: projects.filter(p => 
      p.stack?.some(s => s.toLowerCase().includes('meta')) ||
      p.details?.entity?.toLowerCase().includes('meta') ||
      p.title.toLowerCase().includes('meta')
    ).length,
    ibm: projects.filter(p => 
      p.stack?.some(s => s.toLowerCase().includes('ibm')) ||
      p.details?.entity?.toLowerCase().includes('ibm') ||
      p.title.toLowerCase().includes('ibm')
    ).length,
    apple: projects.filter(p => 
      p.stack?.some(s => s.toLowerCase().includes('apple')) ||
      p.details?.entity?.toLowerCase().includes('apple') ||
      p.title.toLowerCase().includes('apple')
    ).length,
  };
}
