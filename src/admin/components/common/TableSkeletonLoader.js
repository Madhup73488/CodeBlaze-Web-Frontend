import React from 'react';

const TableSkeletonLoader = ({ rows = 5, columns = 4, theme = 'light' }) => {
  const isDark = theme === 'dark';

  const thClasses = `px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
    isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
  }`;
  const tdClasses = `px-6 py-4 whitespace-nowrap text-sm ${
    isDark ? 'bg-gray-800' : 'bg-white'
  }`;
  const skeletonBarClasses = `h-4 rounded ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`;

  return (
    <div className="overflow-x-auto animate-pulse">
      <div className="inline-block min-w-full align-middle">
        <div className={`overflow-hidden shadow-sm sm:rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-100'}>
              <tr>
                {[...Array(columns)].map((_, i) => (
                  <th key={i} scope="col" className={thClasses}>
                    <div className={`${skeletonBarClasses} w-3/4`}></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
              {[...Array(rows)].map((_, i) => (
                <tr key={i}>
                  {[...Array(columns)].map((_, j) => (
                    <td key={j} className={tdClasses}>
                      <div className={`${skeletonBarClasses} ${j === 0 ? 'w-5/6' : 'w-4/6'}`}></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableSkeletonLoader;
