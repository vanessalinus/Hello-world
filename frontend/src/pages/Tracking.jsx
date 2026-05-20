import { useState } from 'react';
import { shipments as shipmentsApi } from '../api';

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{status.replace(/_/g, ' ')}</span>;
}

export default function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const r = await shipmentsApi.track(trackingNumber.trim());
      setResult(r.data);
    } catch (e) {
      setError(e.response?.status === 404 ? 'Shipment not found. Please check the tracking number.' : 'An error occurred. Please try again.');
    }
    setLoading(false);
  };

  const statusSteps = ['pending', 'in_transit', 'out_for_delivery', 'delivered'];
  const currentStep = result ? statusSteps.indexOf(result.status) : -1;

  return (
    <div className="page" style={{ maxWidth: 720, margin: '0 auto' }}>
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <span className="card-title">Track Your Shipment</span>
        </div>
        <div className="card-body">
          <p style={{ color: 'var(--text-secondary)', marginBottom: 16, fontSize: 13 }}>
            Enter your tracking number to get real-time updates on your shipment status.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              className="form-input"
              placeholder="e.g. TRK-020001"
              value={trackingNumber}
              onChange={e => setTrackingNumber(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTrack()}
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary" onClick={handleTrack} disabled={loading}>
              {loading ? 'Tracking...' : 'Track'}
            </button>
          </div>
          {error && <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--danger-light)', color: 'var(--danger)', borderRadius: 6, fontSize: 13 }}>{error}</div>}
        </div>
      </div>

      {result && (
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{result.tracking_number}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                  {result.origin} → {result.destination}
                </div>
              </div>
              <StatusBadge status={result.status} />
            </div>
            <div className="card-body">
              {result.status !== 'failed' && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    {statusSteps.map((step, i) => (
                      <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: i <= currentStep ? 'var(--primary)' : 'var(--border)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontSize: 13, fontWeight: 700, marginBottom: 6,
                          transition: 'background 0.3s',
                        }}>
                          {i < currentStep ? '✓' : i + 1}
                        </div>
                        <span style={{ fontSize: 11, color: i <= currentStep ? 'var(--primary)' : 'var(--text-muted)', fontWeight: i === currentStep ? 700 : 400, textAlign: 'center' }}>
                          {step.replace(/_/g, ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, margin: '0 16px', position: 'relative', top: -44 }}>
                    <div style={{ height: '100%', background: 'var(--primary)', borderRadius: 2, width: `${Math.max(0, (currentStep / (statusSteps.length - 1)) * 100)}%`, transition: 'width 0.5s' }} />
                  </div>
                </div>
              )}

              <div className="form-grid" style={{ marginTop: result.status !== 'failed' ? -28 : 0 }}>
                <div className="detail-row"><span className="detail-label">Driver</span><span className="detail-value">{result.driver_name || 'Not assigned'}</span></div>
                <div className="detail-row"><span className="detail-label">Phone</span><span className="detail-value">{result.driver_phone || '—'}</span></div>
                <div className="detail-row"><span className="detail-label">Vehicle</span><span className="detail-value">{result.vehicle_plate || '—'}</span></div>
                <div className="detail-row"><span className="detail-label">Customer</span><span className="detail-value">{result.customer_name || '—'}</span></div>
                <div className="detail-row"><span className="detail-label">Est. Delivery</span><span className="detail-value">{result.estimated_delivery || '—'}</span></div>
                {result.actual_delivery && (
                  <div className="detail-row"><span className="detail-label">Delivered On</span><span className="detail-value">{result.actual_delivery}</span></div>
                )}
                <div className="detail-row"><span className="detail-label">Weight</span><span className="detail-value">{result.weight} kg</span></div>
                <div className="detail-row"><span className="detail-label">Distance</span><span className="detail-value">{result.distance} km</span></div>
              </div>
            </div>
          </div>

          {result.events && result.events.length > 0 && (
            <div className="card">
              <div className="card-header"><span className="card-title">Tracking History</span></div>
              <div className="card-body">
                <div className="tracking-timeline">
                  {result.events.map((ev, i) => (
                    <div key={ev.id} className="tracking-event">
                      <div className="tracking-line">
                        <div className={`tracking-dot${i > 0 ? ' inactive' : ''}`} />
                        {i < result.events.length - 1 && <div className="tracking-connector" />}
                      </div>
                      <div className="tracking-content">
                        <div className="tracking-title">{ev.event_type.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}</div>
                        <div className="tracking-meta">
                          <strong>{ev.location}</strong> · {new Date(ev.timestamp).toLocaleString()}
                        </div>
                        <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 3 }}>{ev.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
