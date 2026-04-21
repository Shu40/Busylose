"use client";

import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  id: string;
  action: (formData: FormData) => Promise<any>;
}

export function DeleteButton({ id, action }: DeleteButtonProps) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button 
        type="submit"
        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
        title="Remove Contribution"
        onClick={(e) => { 
            if(!confirm("Are you sure you want to remove this? All data for this tool will be permanently deleted.")) {
                e.preventDefault(); 
            }
        }}
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </form>
  );
}
