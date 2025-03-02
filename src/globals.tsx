import { v4 as uuidv4 } from "uuid";

export function nid() {
  const newUuid: string = uuidv4();
  return String(newUuid);
}
