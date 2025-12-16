"use client"
import { Field, FieldLabel } from '@/components/ui/field';
import { useFormCtx } from './FormContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

function SalaryInput() {
    const { data, errors, setField } = useFormCtx();
    return (
        <div>
            <h2 className='text-[#94CE29] hover:text-black transition-colors duration-200 font-bold text-lg lg:text-4xl mb-12'>
                Ingresa tu Salario Mensual
            </h2>
            <Field className='w-full lg:max-w-[300px] mx-auto'>
                <FieldLabel className='text-base font-normal flex lg:justify-center'>Ingresa tu Salario</FieldLabel>
                <Input
                    type='text'
                    value={data.salary}
                    className='border-none shadow-[0px_4px_4px_0px_#00000040]'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const digits = e.target.value.replace(/\D/g, '')
                        setField('salary', digits)
                    }}
                />
                {errors['salary'] && <div className='text-rose-500 font-bold text-sm'>{errors['salary']}</div>}
            </Field>
        </div>
    );
};

function DiscoverySource() {
    const { data, errors, setField } = useFormCtx();
    return (
        <div>
            <h2 className='text-[#94CE29] hover:text-black transition-colors duration-200 font-bold text-lg lg:text-4xl mb-12'>
                ¿Cómo escuchaste de QuincenaToGo?
            </h2>
            <Field className='w-full max-w-3xl mx-auto'>
                <FieldLabel className='text-base font-normal'>¡Cuéntanos! Nos encantaría escucharte</FieldLabel>
                <Textarea
                    value={data.source}
                    className='border-none shadow-[0px_4px_4px_0px_#00000040]'
                    onChange={(e) => setField('source', e.target.value)}
                />
                {errors['source'] && <div className='text-rose-500 font-bold text-sm'>{errors['source']}</div>}
            </Field>
        </div>
    );
};

function TermsAndConditions() {
    const { data, errors, setField } = useFormCtx();

    const CLAUSES = `Cláusula de Aceptación

Al momento de enviar su solicitud de adelanto y presionar el botón "Solicitar Adelanto", usted declara que la información proporcionada es verídica y autoriza a QuincenatoGo a verificarla por los medios que considere necesarios. Asimismo, acepta que la información enviada será utilizada para procesar su solicitud y formar parte de los registros internos de QuincenatoGo. Toda la información será tratada como confidencial y clasificada como "Información Privada" del solicitante.

Cláusula de Consentimiento

Bajo juramento de Ley, expresamente manifiesto mí consentimiento para que Rapid Credit. S.A./QuincenaToGo, pueda consultar, almacenar, distribuir, difundir o comercializar los datos personales, que tuviera conocimiento y que pudiera haber recabado, derivado de la presente gestión crediticia; por lo que manifiesto que tengo conocimiento del alcance de la presente autorización.

Así mismo, autorizo a Rapid Credit. S.A./QuincenaToGo a realizar el proceso de investigación de mi información financiera y personal ante los buros de referencias crediticias de la Superintendencia de Bancos, así como cualquier otro buró estatal, privado, interno y externo disponibles incluyendo a Trans Union Guatemala, S.A. y sus filiales nacionales y/o extranjeras.

Adicionalmente, autorizo expresamente a los Burós de la Superintendencia de Bancos, de la República de Guatemala y otras entidades y privadas como burós de crédito incluyendo a Trans Union Guatemala, S.A. y sus filiales nacionales y/o extranjeras y cualquier otro que se establezca en el futuro para que puedan consultar, difundir, distribuir o comercializar los datos personales contenidos en los sistemas de información desarrollados en el ejercicio de sus funciones, para lo cual doy mi consentimiento expreso por escrito, de acuerdo al artículo No. 31 del decreto Ley No. 57-2008, Ley de Acceso a la Información.`;

    const blocks = CLAUSES.split('\n\n').map(b => b.trim()).filter(Boolean);

    return (
        <div>
            <div className='text-justify mx-auto leading-relaxed'>
                {blocks.map((b, i) => (
                    b.toLowerCase().startsWith('cláusula') ? (
                        <h3 key={i} className='font-bold mb-3'>{b}</h3>
                    ) : (
                        <p key={i} className='mb-4'>{b}</p>
                    )
                ))}
            </div>
            <div className='flex flex-col items-center justify-center gap-12 my-20 max-w-2xl mx-auto'>
                <div>
                    <div className='flex items-center gap-4'>
                        <Checkbox
                            id='legalAcceptance'
                            className='w-6 h-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'
                            checked={!!data.legal.acceptance}
                            onCheckedChange={(v) => setField('legal.acceptance', !!v)}
                        />
                        <label htmlFor='legalAcceptance' className='text-base lg:text-lg'>
                            He leído y acepto la <strong>Cláusula de Aceptación</strong>.
                        </label>
                    </div>
                    {errors['legal.acceptance'] && <div className='mt-2 text-rose-500 font-bold text-sm text-center'>{errors['legal.acceptance']}</div>}
                </div>
                <div>
                    <div className='flex items-center gap-4 justify-center '>
                        <Checkbox
                            id='legalConsent'
                            className='w-6 h-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'
                            checked={!!data.legal.consent}
                            onCheckedChange={(v) => setField('legal.consent', !!v)}
                        />
                        <label htmlFor='legalConsent' className='text-base lg:text-lg'>
                            He leído y acepto la <strong>Cláusula de Consentimiento</strong>.
                        </label>
                    </div>
                    {errors['legal.consent'] && <div className='mt-2 text-rose-500 font-bold text-sm text-center'>{errors['legal.consent']}</div>}
                </div>
            </div>
        </div>
    );
}

export function SummarySection() {
    return (
        <>
            <SalaryInput />
            <DiscoverySource />
            <TermsAndConditions />

        </>
    );
};