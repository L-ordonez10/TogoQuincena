"use client"
import { Field, FieldLabel } from '@/components/ui/field';
import { useFormCtx } from './FormContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useMemo, useState, useEffect } from 'react';

const formatCurrency = (value: number) => {
    return value.toLocaleString('es-GT', { style: 'currency', currency: 'GTQ', maximumFractionDigits: 2 });
};

const formatCurrencyDisplay = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value.replace(/\D/g, '')) : value;
    if (isNaN(num) || num === 0) return '';
    return `Q${num.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

function MiniQuote({ salary, amountRequested }: { salary: number | string; amountRequested: number | string }) {
    const salaryNum = useMemo(() => {
        const num = typeof salary === 'string' ? parseFloat(salary.replace(/\D/g, '')) : salary;
        return isNaN(num) ? 0 : num;
    }, [salary]);

    const requestedNum = useMemo(() => {
        const num = typeof amountRequested === 'string' ? parseFloat(amountRequested.replace(/\D/g, '')) : amountRequested;
        return isNaN(num) ? 0 : num;
    }, [amountRequested]);

    const max = useMemo(() => Math.min(salaryNum * 0.2, 1500), [salaryNum]);
    const gastos = 75;
    const deposit = useMemo(() => Math.round((requestedNum - gastos) * 100) / 100, [requestedNum]);
    const toPay = useMemo(() => Math.round((requestedNum + requestedNum * 0.336) * 100) / 100, [requestedNum]);

    if (salaryNum === 0) return null;

    return (
        <div className="w-full max-w-md mx-auto mt-6 rounded-xl border border-[#D9F3B6] bg-white shadow-sm">
            <div className="p-6">
                <h3 className="text-sm text-gray-500">Monto máximo que podríamos otorgarte</h3>
                <p className="text-2xl font-bold text-[#90C928] mt-2">{formatCurrency(max)}</p>

                {requestedNum > 0 && (
                    <div className="mt-4 space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between text-red-500">
                            <span>Gastos legales:</span>
                            <span>-{formatCurrency(gastos)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Te depositaremos:</span>
                            <span className="text-[#90C928]">{formatCurrency(deposit)}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Tú deberás pagar:</span>
                            <span>{formatCurrency(toPay)}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function SalaryInput() {
    const { data, errors, setField } = useFormCtx();
    
    const [salaryDisplay, setSalaryDisplay] = useState<string>('');
    const [amountDisplay, setAmountDisplay] = useState<string>('');
    const [isSalaryFocused, setIsSalaryFocused] = useState<boolean>(false);
    const [isAmountFocused, setIsAmountFocused] = useState<boolean>(false);
    
    const maxAllowed = useMemo(() => {
        const salaryValue = String(data.salary || '');
        const salaryNum = parseFloat(salaryValue.replace(/\D/g, ''));
        return isNaN(salaryNum) || salaryNum === 0 ? 1500 : Math.min(salaryNum * 0.2, 1500);
    }, [data.salary]);

    // Actualizar displays cuando cambian los datos y no están enfocados
    useEffect(() => {
        if (!isSalaryFocused) {
            setSalaryDisplay(formatCurrencyDisplay(String(data.salary || '')));
        }
    }, [data.salary, isSalaryFocused]);

    useEffect(() => {
        if (!isAmountFocused) {
            setAmountDisplay(formatCurrencyDisplay(String(data.amountRequested || '')));
        }
    }, [data.amountRequested, isAmountFocused]);

    return (
        <div>
            <h2 className='text-[#94CE29] hover:text-black transition-colors duration-200 font-bold text-lg lg:text-4xl mb-12'>
                Ingresa tu Salario Mensual
            </h2>
            <Field className='w-full lg:max-w-75 mx-auto'>
                <FieldLabel className='text-base font-normal flex lg:justify-center'>Ingresa tu Salario</FieldLabel>
                <Input
                    type='text'
                    value={salaryDisplay}
                    placeholder='Q0.00'
                    className='border-none shadow-[0px_4px_4px_0px_#00000040] text-center'
                    onFocus={() => {
                        setIsSalaryFocused(true);
                        setSalaryDisplay(String(data.salary || ''));
                    }}
                    onBlur={() => {
                        setIsSalaryFocused(false);
                        setSalaryDisplay(formatCurrencyDisplay(String(data.salary || '')));
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const digits = e.target.value.replace(/\D/g, '');
                        setSalaryDisplay(digits);
                        setField('salary', digits);
                    }}
                />
                {errors['salary'] && <div className='text-rose-500 font-bold text-sm'>{errors['salary']}</div>}
            </Field>

            <Field className='w-full lg:max-w-75 mx-auto mt-8'>
                <FieldLabel className='text-base font-normal flex lg:justify-center'>¿Cuánto adelanto deseas solicitar?</FieldLabel>
                <Input
                    type='text'
                    value={amountDisplay}
                    placeholder='Q0.00'
                    className='border-none shadow-[0px_4px_4px_0px_#00000040] text-center'
                    onFocus={() => {
                        setIsAmountFocused(true);
                        setAmountDisplay(String(data.amountRequested || ''));
                    }}
                    onBlur={() => {
                        setIsAmountFocused(false);
                        setAmountDisplay(formatCurrencyDisplay(String(data.amountRequested || '')));
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const digits = e.target.value.replace(/\D/g, '');
                        const numValue = parseFloat(digits) || 0;
                        
                        // Limitar al máximo permitido
                        const limitedValue = numValue > maxAllowed ? Math.floor(maxAllowed) : numValue;
                        setAmountDisplay(String(limitedValue));
                        setField('amountRequested', String(limitedValue));
                    }}
                />
                {errors['amountRequested'] && <div className='text-rose-500 font-bold text-sm'>{errors['amountRequested']}</div>}
            </Field>
            <MiniQuote salary={data.salary} amountRequested={data.amountRequested} />
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