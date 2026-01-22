import React, { useState, useEffect } from 'react';

export default function HoldemCalculator() {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      name: '세션 1',
      buyinAmount: 20,
      slots: 2,
      players: [
        { name: 'A', buyinCount: 0, finalAmount: 0 },
        { name: 'B', buyinCount: 0, finalAmount: 0 },
        { name: 'C', buyinCount: 0, finalAmount: 0 },
        { name: 'D', buyinCount: 0, finalAmount: 0 },
        { name: 'E', buyinCount: 0, finalAmount: 0 },
      ],
      isRunning: false,
      startTime: null,
      elapsedTime: 0
    }
  ]);
  
  const [currentSessionId, setCurrentSessionId] = useState(1);
  const [timerInterval, setTimerInterval] = useState(null);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  useEffect(() => {
    let interval;
    if (currentSession?.isRunning && currentSession?.startTime) {
      interval = setInterval(() => {
        updateCurrentSession({
          elapsedTime: Date.now() - currentSession.startTime
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentSession?.isRunning, currentSession?.startTime]);

  const updateCurrentSession = (updates) => {
    setSessions(prev => prev.map(session => 
      session.id === currentSessionId 
        ? { ...session, ...updates }
        : session
    ));
  };

  const addNewSession = () => {
    const newId = Math.max(...sessions.map(s => s.id)) + 1;
    const newSession = {
      id: newId,
      name: `세션 ${newId}`,
      buyinAmount: 20,
      slots: 2,
      players: [
        { name: 'A', buyinCount: 0, finalAmount: 0 },
        { name: 'B', buyinCount: 0, finalAmount: 0 },
        { name: 'C', buyinCount: 0, finalAmount: 0 },
        { name: 'D', buyinCount: 0, finalAmount: 0 },
        { name: 'E', buyinCount: 0, finalAmount: 0 },
      ],
      isRunning: false,
      startTime: null,
      elapsedTime: 0
    };
    setSessions([...sessions, newSession]);
    setCurrentSessionId(newId);
  };

  const refreshSession = () => {
    if (window.confirm('현재 세션의 모든 데이터를 초기화하시겠습니까?')) {
      updateCurrentSession({
        buyinAmount: 20,
        slots: 2,
        players: [
          { name: 'A', buyinCount: 0, finalAmount: 0 },
          { name: 'B', buyinCount: 0, finalAmount: 0 },
          { name: 'C', buyinCount: 0, finalAmount: 0 },
          { name: 'D', buyinCount: 0, finalAmount: 0 },
          { name: 'E', buyinCount: 0, finalAmount: 0 },
        ],
        isRunning: false,
        startTime: null,
        elapsedTime: 0
      });
    }
  };

  const deleteSession = (sessionId) => {
    if (sessions.length === 1) {
      alert('마지막 세션은 삭제할 수 없습니다.');
      return;
    }
    if (window.confirm('이 세션을 삭제하시겠습니까?')) {
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      if (currentSessionId === sessionId) {
        setCurrentSessionId(sessions[0].id === sessionId ? sessions[1].id : sessions[0].id);
      }
    }
  };

  const renameSession = (sessionId) => {
    const newName = prompt('새 세션 이름을 입력하세요:', sessions.find(s => s.id === sessionId)?.name);
    if (newName && newName.trim()) {
      setSessions(prev => prev.map(s => 
        s.id === sessionId ? { ...s, name: newName.trim() } : s
      ));
    }
  };

  const handleStart = () => {
    if (!currentSession.isRunning) {
      updateCurrentSession({
        startTime: Date.now() - currentSession.elapsedTime,
        isRunning: true
      });
    }
  };

  const handleStop = () => {
    updateCurrentSession({ isRunning: false });
  };

  const handleReset = () => {
    updateCurrentSession({
      isRunning: false,
      startTime: null,
      elapsedTime: 0
    });
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const updatePlayer = (index, field, value) => {
    const newPlayers = [...currentSession.players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    updateCurrentSession({ players: newPlayers });
  };

  const addPlayer = () => {
    const nextLetter = String.fromCharCode(65 + currentSession.players.length);
    updateCurrentSession({
      players: [...currentSession.players, { name: nextLetter, buyinCount: 0, finalAmount: 0 }]
    });
  };

  const removePlayer = (index) => {
    if (currentSession.players.length > 1) {
      updateCurrentSession({
        players: currentSession.players.filter((_, i) => i !== index)
      });
    }
  };

  const calculateAmount = (buyinCount) => {
    return buyinCount * currentSession.buyinAmount;
  };

  const calculateSettlement = (buyinCount, finalAmount) => {
    return finalAmount - calculateAmount(buyinCount);
  };

  const calculateFinalSettlement = (buyinCount, finalAmount) => {
    return calculateSettlement(buyinCount, finalAmount) / currentSession.slots;
  };

  const getTotalBuyins = () => {
    return currentSession.players.reduce((sum, p) => sum + calculateAmount(p.buyinCount), 0);
  };

  const getTotalFinal = () => {
    return currentSession.players.reduce((sum, p) => sum + p.finalAmount, 0);
  };

  const getTotalSettlement = () => {
    return currentSession.players.reduce((sum, p) => sum + calculateSettlement(p.buyinCount, p.finalAmount), 0);
  };

  const getTotalFinalSettlement = () => {
    return currentSession.players.reduce((sum, p) => sum + calculateFinalSettlement(p.buyinCount, p.finalAmount), 0);
  };

  if (!currentSession) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-800">홀덤 정산 프로그램</h1>
        
        {/* Session Tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
            {sessions.map(session => (
              <div key={session.id} className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentSessionId(session.id)}
                  className={`px-4 py-2 rounded-t-lg font-semibold transition whitespace-nowrap ${
                    currentSessionId === session.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {session.name}
                </button>
                <button
                  onClick={() => renameSession(session.id)}
                  className="px-2 py-2 text-gray-600 hover:text-gray-800"
                  title="이름 변경"
                >
                  ✏️
                </button>
                {sessions.length > 1 && (
                  <button
                    onClick={() => deleteSession(session.id)}
                    className="px-2 py-2 text-red-600 hover:text-red-800"
                    title="세션 삭제"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addNewSession}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition whitespace-nowrap"
            >
              + 새 세션
            </button>
          </div>
          <div className="flex justify-end">
            <button
              onClick={refreshSession}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition flex items-center gap-2"
            >
              🔄 세션 초기화
            </button>
          </div>
        </div>
        
        {/* Timer Section */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-mono font-bold text-gray-800">
              {formatTime(currentSession.elapsedTime)}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleStart}
                disabled={currentSession.isRunning}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition"
              >
                START
              </button>
              <button
                onClick={handleStop}
                disabled={!currentSession.isRunning}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition"
              >
                STOP
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold transition"
              >
                RESET
              </button>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-yellow-100 rounded-lg p-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">바이인 금액 (만원)</label>
            <input
              type="number"
              value={currentSession.buyinAmount}
              onChange={(e) => updateCurrentSession({ buyinAmount: Number(e.target.value) })}
              className="w-full px-3 py-2 border-2 border-yellow-400 rounded-lg focus:outline-none focus:border-yellow-600"
            />
          </div>
          <div className="bg-blue-100 rounded-lg p-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">슬롯 (정산 나누는 계수)</label>
            <input
              type="number"
              value={currentSession.slots}
              onChange={(e) => updateCurrentSession({ slots: Number(e.target.value) })}
              className="w-full px-3 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>
          <div className="bg-green-100 rounded-lg p-4 flex items-end">
            <button
              onClick={addPlayer}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition"
            >
              + 플레이어 추가
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-2 border-gray-300 p-3 text-left">플레이어</th>
                <th className="border-2 border-gray-300 p-3 text-center">바이인 횟수</th>
                <th className="border-2 border-gray-300 p-3 text-right">금액 (만원)</th>
                <th className="border-2 border-gray-300 p-3 text-center">최종 딴 금액 (만원)</th>
                <th className="border-2 border-gray-300 p-3 text-right">정산 (만원)</th>
                <th className="border-2 border-gray-300 p-3 text-right">최종금액 (만원)</th>
                <th className="border-2 border-gray-300 p-3 text-center">삭제</th>
              </tr>
            </thead>
            <tbody>
              {currentSession.players.map((player, index) => {
                const amount = calculateAmount(player.buyinCount);
                const settlement = calculateSettlement(player.buyinCount, player.finalAmount);
                const finalSettlement = calculateFinalSettlement(player.buyinCount, player.finalAmount);
                const hasError = player.buyinCount > 0 && player.buyinCount < 1;
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border-2 border-gray-300 p-2">
                      <input
                        type="text"
                        value={player.name}
                        onChange={(e) => updatePlayer(index, 'name', e.target.value)}
                        className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      <input
                        type="number"
                        value={player.buyinCount || ''}
                        onChange={(e) => updatePlayer(index, 'buyinCount', Number(e.target.value) || 0)}
                        className={`w-full px-2 py-1 border rounded text-center focus:outline-none ${
                          hasError ? 'border-red-500 bg-red-50' : 'focus:border-blue-500'
                        }`}
                      />
                      {hasError && (
                        <div className="text-xs text-red-600 mt-1 text-center">최소 1 이상</div>
                      )}
                    </td>
                    <td className="border-2 border-gray-300 p-2 text-right font-mono bg-blue-50">
                      {amount}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      <input
                        type="number"
                        value={player.finalAmount || ''}
                        onChange={(e) => updatePlayer(index, 'finalAmount', Number(e.target.value) || 0)}
                        className="w-full px-2 py-1 border rounded text-center focus:outline-none focus:border-blue-500"
                      />
                    </td>
                    <td className={`border-2 border-gray-300 p-2 text-right font-mono ${settlement >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {settlement > 0 ? '+' : ''}{settlement}
                    </td>
                    <td className={`border-2 border-gray-300 p-2 text-right font-mono font-bold ${finalSettlement >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {finalSettlement > 0 ? '+' : ''}{finalSettlement.toFixed(1)}
                    </td>
                    <td className="border-2 border-gray-300 p-2 text-center">
                      <button
                        onClick={() => removePlayer(index)}
                        disabled={currentSession.players.length <= 1}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-yellow-100 font-bold">
                <td className="border-2 border-gray-300 p-2">합계</td>
                <td className="border-2 border-gray-300 p-2"></td>
                <td className="border-2 border-gray-300 p-2 text-right font-mono">
                  {getTotalBuyins()}
                </td>
                <td className="border-2 border-gray-300 p-2 text-right font-mono">
                  {getTotalFinal()}
                </td>
                <td className="border-2 border-gray-300 p-2 text-right font-mono">
                  {getTotalSettlement()}
                </td>
                <td className="border-2 border-gray-300 p-2 text-right font-mono">
                  {getTotalFinalSettlement().toFixed(1)}
                </td>
                <td className="border-2 border-gray-300 p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p>※ 모든 금액은 만원 단위입니다.</p>
          <p>※ 금액 = 바이인 횟수 × 바이인 금액</p>
          <p>※ 정산 = 최종 딴 금액 - 금액</p>
          <p>※ 최종금액 = 정산 ÷ 슬롯</p>
          <p>※ 세션별로 게임 기록을 관리할 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
}
