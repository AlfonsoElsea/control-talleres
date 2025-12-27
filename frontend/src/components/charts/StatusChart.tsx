import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const StatusChart: React.FC = () => {
  const data = [
    { name: 'Nuevo', value: 12, color: '#3B82F6' },
    { name: 'Diagnóstico', value: 8, color: '#F59E0B' },
    { name: 'Reparación', value: 18, color: '#8B5CF6' },
    { name: 'Reparado', value: 24, color: '#10B981' },
    { name: 'Entregado', value: 32, color: '#06B6D4' },
    { name: 'Perdido', value: 6, color: '#EF4444' },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(24, 24, 27, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
          }}
          formatter={(value) => [`${value} leads`, 'Cantidad']}
        />
        <Legend 
          verticalAlign="bottom"
          height={36}
          formatter={(value, entry) => (
            <span className="text-sm text-gray-300">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusChart;
