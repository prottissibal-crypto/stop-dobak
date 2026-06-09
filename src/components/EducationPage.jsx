import React from 'react'

export default function EducationPage(){
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">교육: 도박의 핵심 개념</h2>
      <section className="bg-gray-800/40 p-4 rounded">
        <h3 className="font-semibold">도박사의 오류</h3>
        <p>과거의 결과가 미래의 확률에 영향을 준다고 믿는 것. 독립 시도에 적용되지 않습니다.</p>
      </section>
      <section className="bg-gray-800/40 p-4 rounded">
        <h3 className="font-semibold">손실 추격 (Loss Chasing)</h3>
        <p>손실을 만회하려고 더 큰 베팅을 하는 행동은 손실을 더 키우는 경향이 있습니다.</p>
      </section>
      <section className="bg-gray-800/40 p-4 rounded">
        <h3 className="font-semibold">확률과 기대값</h3>
        <p>각 베팅의 기대값은 장기적으로 평균적인 손익을 말합니다. 카지노는 양수의 기대값을 유지합니다.</p>
      </section>
      <section className="bg-gray-800/40 p-4 rounded">
        <h3 className="font-semibold">왜 카지노는 장기적으로 수익을 얻는가</h3>
        <p>하우스 엣지(수수료)로 인해 각 베팅마다 평균적으로 플레이어보다 이익이 남습니다.</p>
      </section>
      <section className="bg-gray-800/40 p-4 rounded">
        <h3 className="font-semibold">도박 중독의 위험성</h3>
        <p>감정적·사회적 피해를 초래할 수 있으며, 문제가 있다면 전문가의 도움을 받으세요.</p>
      </section>
    </div>
  )
}
