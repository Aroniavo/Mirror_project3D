import { useState } from 'react'
import { Button } from './UI'

export default function DataTable({ 
  title, 
  data = [], 
  columns = [], 
  onCreateClick, 
  createButtonText = "Créer",
  loading = false,
  emptyMessage = "Aucune donnée disponible"
}) {
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0
    
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div className="bg-white rounded-lg shadow-sm border border-zinc-200">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-zinc-200">
        <h2 className="text-xl font-semibold text-zinc-900">{title}</h2>
        {onCreateClick && (
          <Button onClick={onCreateClick} className="bg-violet-600 hover:bg-violet-700">
            + {createButtonText}
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
            <span className="ml-3 text-zinc-600">Chargement...</span>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center p-12 text-zinc-500">
            <div className="text-4xl mb-4">📋</div>
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider ${
                      column.sortable ? 'cursor-pointer hover:bg-zinc-100' : ''
                    }`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {column.sortable && sortColumn === column.key && (
                        <span className="text-violet-600">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-zinc-200">
              {sortedData.map((row, index) => (
                <tr key={row.id || index} className="hover:bg-zinc-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      {data.length > 0 && (
        <div className="px-6 py-3 bg-zinc-50 border-t border-zinc-200">
          <p className="text-sm text-zinc-700">
            Total: {data.length} élément{data.length > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  )
}
