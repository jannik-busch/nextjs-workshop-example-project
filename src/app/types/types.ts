import { ColumnDef } from "@tanstack/react-table";

export type Project = {
  id: number;
  status: "created" | "pending" | "in_progress" | "success" | "failed";
  name: string;
  description: string;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
