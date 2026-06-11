// src/components/common/ConfirmationModal.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-secondary-800 rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-4 border-b dark:border-secondary-700">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-600 dark:text-gray-300">{message}</p>
          {children}
        </div>
        <div className="flex justify-end space-x-3 p-4 border-t dark:border-secondary-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-secondary-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
