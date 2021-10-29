export type ListItemActionProps = {
  title: string;
  action: () => void;
};

export const ListItemAction = ({ title, action }: ListItemActionProps) => (
  <div className="ListItemAction">
    <span className="ListItemAction-Title" role="button" onClick={action}>
      {title}
    </span>
  </div>
);
