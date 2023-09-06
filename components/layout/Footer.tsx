import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <div className="bg-primary text-white text-xs">
        <div className="max-w-7xl mx-auto text-center py-3">
          <div>
            <Link
              href="https://feproon.com.br/wp-content/uploads/2022/10/FEPRO-2022-2023.1-PRESENCIAL.pdf"
              target="_blank"
              rel="noopener"
            >
              Acesse aqui
            </Link>{' '}
            o regulamento do Concurso de Bolsa FEPRO 2022 – 2023.01 – Graduação
            Presencial.{' '}
            <a target="_blank" rel="noopener">
              Acesse aqui
            </a>{' '}
            o regulamento do Concurso de Bolsa FEPRO 2022 – 2023.01 – Cursos de
            Graduação, modalidade a distância, com metodologias EAD 100%
            on-line, EAD Semipresencial e EAD com aulas ao vivo. Consulte mais
            informações, os regulamentos completos e os editais nos sites das
            instituições Cruzeiro do Sul Educacional de seu interesse.{' '}
          </div>
          <div>
            Cruzeiro do Sul Educacional S.A. CNPJ: 62.984.091/0001-02 © 2022
            Todos os direitos reservados.{' '}
          </div>
          <div>Política de Privacidade</div>
        </div>
      </div>
    </>
  )
}
