// AdminLicenseGeneratorView.tsx - Kid-Friendly Version (Admin only)
import React, { useState } from 'react';
import { GeneratedLicenseRecord, LicenseType, AppSettings } from '../types';
import { generateLicenseKey } from '../utils/crypto';
import { getTranslation } from '../utils/i18n';
import { KeyRound, Copy, Check, Download, ShieldCheck, Sparkles, Clock, AlertCircle, Star } from 'lucide-react';

interface AdminLicenseGeneratorViewProps {
  currentDeviceId: string;
  settings: AppSettings;
}

export const AdminLicenseGeneratorView: React.FC<AdminLicenseGeneratorViewProps> = ({
  currentDeviceId,
  settings,
}) => {
  const lang = settings.language;
  const t = (key: any) => getTranslation(lang, key);
  const [targetDeviceId, setTargetDeviceId] = useState(currentDeviceId);
  const [licenseType, setLicenseType] = useState<LicenseType>('USER');
  const [durationMonths, setDurationMonths] = useState(3);
  const [holderName, setHolderName] = useState('Authorized Learner');

  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [generatedRecords, setGeneratedRecords] = useState<GeneratedLicenseRecord[]>([]);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetDeviceId.trim()) return;

    const res = generateLicenseKey(
      targetDeviceId.trim(),
      licenseType,
      durationMonths,
      holderName.trim()
    );

    setGeneratedKey(res.key);

    const record: GeneratedLicenseRecord = {
      id: res.payload.licenseId,
      key: res.key,
      deviceId: res.payload.deviceId,
      licenseType: res.payload.licenseType,
      issuedAt: res.payload.issuedAt,
      expiresAt: res.payload.expiresAt,
      holderName: res.payload.holderName,
    };

    setGeneratedRecords((prev) => [record, ...prev]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <span className="text-4xl">🔑</span>
        <div>
          <h2 className="text-2xl font-bold text-[#3E4A3E] dark:text-[#F5F2EA]">
            License Generator
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Create licenses for your learners! (Admin Only)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="p-6 bg-white dark:bg-[#242824] border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA] flex items-center gap-2 mb-4">
            <span>📝</span> New License
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="font-bold text-sm text-gray-600 dark:text-gray-400 block mb-2">
                Device ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={targetDeviceId}
                  onChange={(e) => setTargetDeviceId(e.target.value)}
                  placeholder="DEV-XXXX-XXXX-XXXX"
                  className="flex-1 p-3 font-mono bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setTargetDeviceId(currentDeviceId)}
                  className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  📱 Mine
                </button>
              </div>
            </div>

            <div>
              <label className="font-bold text-sm text-gray-600 dark:text-gray-400 block mb-2">
                License Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['USER', 'ADMIN', 'VIP'] as LicenseType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setLicenseType(type)}
                    className={`py-2.5 rounded-xl font-bold text-sm border-2 transition-all ${
                      licenseType === type
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {type === 'USER' ? '👤 User' : type === 'ADMIN' ? '🛡️ Admin' : '⭐ VIP'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-bold text-sm text-gray-600 dark:text-gray-400 block mb-2">
                Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[3, 6, 12].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setDurationMonths(m)}
                    className={`py-2.5 rounded-xl font-bold text-sm border-2 transition-all ${
                      durationMonths === m
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {m} Months
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-bold text-sm text-gray-600 dark:text-gray-400 block mb-2">
                Holder Name
              </label>
              <input
                type="text"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl text-sm shadow-md hover:scale-105 transition-transform"
            >
              🔑 Generate License
            </button>
          </form>
        </div>

        {/* Output */}
        <div className="p-6 bg-white dark:bg-[#242824] border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA] flex items-center gap-2 mb-4">
            <span>📋</span> License Key
          </h3>

          {generatedKey ? (
            <div className="flex-1 flex flex-col gap-4">
              <textarea
                readOnly
                value={generatedKey}
                rows={6}
                className="w-full p-3 font-mono text-sm bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-[#2D2A26] dark:text-[#EAE7DF] focus:outline-none"
              />
              <button
                onClick={() => copyToClipboard(generatedKey)}
                className="w-full py-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-bold rounded-2xl text-sm shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                {copiedKey ? (
                  <>
                    <Check className="w-4 h-4" /> ✅ Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> 📋 Copy Key
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500">
              <div className="text-6xl mb-4">🔐</div>
              <p className="text-sm">Fill in the form and click generate!</p>
            </div>
          )}
        </div>
      </div>

      {/* History */}
      <div className="p-5 bg-white dark:bg-[#242824] border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
        <h3 className="text-lg font-bold text-[#3E4A3E] dark:text-[#F5F2EA] flex items-center gap-2 mb-4">
          <span>📜</span> License History ({generatedRecords.length})
        </h3>

        {generatedRecords.length === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-2">📭</div>
            <p>No licenses generated yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                  <th className="pb-3 text-left">ID</th>
                  <th className="pb-3 text-left">Device</th>
                  <th className="pb-3 text-left">Type</th>
                  <th className="pb-3 text-left">Expires</th>
                  <th className="pb-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {generatedRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                      {rec.id}
                    </td>
                    <td className="py-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                      {rec.deviceId}
                    </td>
                    <td className="py-3 font-bold">
                      {rec.licenseType === 'USER' ? '👤' : rec.licenseType === 'ADMIN' ? '🛡️' : '⭐'}
                    </td>
                    <td className="py-3 text-gray-500 dark:text-gray-400 text-xs">
                      {new Date(rec.expiresAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => copyToClipboard(rec.key)}
                        className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-sm"
                      >
                        📋 Copy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};