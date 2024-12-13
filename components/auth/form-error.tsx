interface Prop {
  message?: string;
}

export const FormError = ({ message }: Prop) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded flex items-center gap-x-2 text-sm text-destructive">
      <p>{message}</p>
    </div>
  );
};
