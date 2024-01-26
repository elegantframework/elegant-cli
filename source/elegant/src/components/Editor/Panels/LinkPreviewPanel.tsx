import { Pen, Trash2 } from "lucide-react";
import { Surface } from "../Toolbar/Surface";
import { Toolbar } from "../Toolbar/Toolbar";
import Tooltip from "../Toolbar/Tooltip";


export type LinkPreviewPanelProps = {
  url: string;
  onEdit: () => void
  onClear: () => void
};

export const LinkPreviewPanel = ({ onClear, onEdit, url }: LinkPreviewPanelProps) => {
  return (
    <Surface className="flex items-center gap-2 p-2">
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm underline">
        {url}
      </a>
      <Toolbar.Divider />
      <Tooltip title="Edit link">
        <Toolbar.Button onClick={onEdit}>
          <Pen className='w-4 h-4' strokeWidth={2.5}/>
        </Toolbar.Button>
      </Tooltip>
      <Tooltip title="Remove link">
        <Toolbar.Button onClick={onClear}>
          <Trash2 className='w-4 h-4' strokeWidth={2.5}/>
        </Toolbar.Button>
      </Tooltip>
    </Surface>
  )
}
