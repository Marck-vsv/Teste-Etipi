import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ComplaintActionsDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ComplaintActionsDropdown({
  onEdit,
  onDelete,
}: ComplaintActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="flex items-center cursor-pointer justify-center w-8 h-8 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open options</span>
          <MoreVertical className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <button
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              className="cursor-pointer text-gray-700 flex px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </button>
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="cursor-pointer text-red-600 flex px-4 py-2 text-sm w-full text-left hover:bg-red-50"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
