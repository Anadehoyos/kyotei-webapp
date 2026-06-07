import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Suppliers() {
  return (
    <div className="flex gap-4 p-6">
      <div className="flex flex-1 flex-col gap-2">
        <Input
          id="vendor-name"
          type="text"
          placeholder="Ingrese el nombre o RUC del proveedor"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Select>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Categoría del proveedor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Select>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Estado del proveedor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
