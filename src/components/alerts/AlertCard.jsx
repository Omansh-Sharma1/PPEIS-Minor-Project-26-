export default function AlertCard({ alert }) {
  return (
    <div className={`${alert.color} backdrop-blur-md border border-gray-700 rounded-xl p-4 flex items-start space-x-4 shadow-lg`}>
      <div className="text-2xl">{alert.icon}</div>
      <div>
        <p className="font-bold text-gray-100">{alert.title}</p>
        <p className="text-gray-300">{alert.description}</p>
      </div>
    </div>
  );
}