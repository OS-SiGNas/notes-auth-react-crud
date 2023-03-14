interface Props {
  title: string;
  description: string;
  content: string;
}

export const NoteCard = ({ title, description, content }: Props): JSX.Element => {
  return (
    <div className="note">
      <h2>{title}</h2>
      <h4>{description}</h4>
      <p>{content}</p>
    </div>
  );
};
