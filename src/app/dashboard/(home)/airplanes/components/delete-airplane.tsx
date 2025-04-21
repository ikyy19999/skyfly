"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React, { type FC } from "react";
import { useFormStatus } from "react-dom"; // Periksa apakah ini tersedia di proyek Anda
import { deleteAirplane } from "../lib/actions";

interface DeleteAirplaneProps {
  id: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      size="sm"
      disabled={pending}
      type="submit"
      variant="destructive"
    >
      <Trash className="mr-2 h-4 w-4" />
      Hapus
    </Button>
  );
}

const DeleteAirplane: FC<DeleteAirplaneProps> = ({ id }) => {
  const deleteAirplaneWithId = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    try {
      await deleteAirplane(id); // Pastikan deleteAirplane adalah fungsi async
      // Aksi setelah penghapusan, misalnya redirect atau tampilkan pesan sukses
    } catch (error) {
      console.error("Error deleting airplane:", error);
      // Tindakan jika gagal menghapus
    }
  };

  return (
    <form onSubmit={deleteAirplaneWithId}>
      <SubmitButton />
    </form>
  );
};

export default DeleteAirplane;
