interface Props {
  message?: string;
}

export default function ErrorMessage(prop: Props) {
  return (
    <>
      <div>
        {prop.message && (
          <div className="w-full flex items-center text-orange-600 bg-orange-50 border-orange-200 border rounded-lg p-2">
            {prop.message}
          </div>
        )}
      </div>
    </>
  );
}
