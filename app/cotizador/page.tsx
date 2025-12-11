"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Info } from "lucide-react"

export default function CotizadorPage() {
  const [salary, setSalary] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    montoSolicitado: number
    comision: number
    totalRecibir: number
    totalPagar: number
  } | null>(null)

  const handleCalculate = () => {
    const salaryNum = parseFloat(salary.replace(/,/g, ""))
    const min = 500
    const max = 1500

    if (isNaN(salaryNum) || salaryNum <= 0) {
      setError("Por favor, ingresa un monto válido.")
      setResult(null)
      return
    }
    if (salaryNum < min) {
      setError(`El monto mínimo permitido es Q${min.toFixed(2)}.`)
      setResult(null)
      return
    }
    if (salaryNum > max) {
      setError(`El monto máximo permitido es Q${max.toFixed(2)}.`)
      setResult(null)
      return
    }

    setError(null)
    const comision = salaryNum * 0.05
    const totalRecibir = salaryNum - comision
    const totalPagar = salaryNum
    setResult({ montoSolicitado: salaryNum, comision, totalRecibir, totalPagar })
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
    }).format(value)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-12 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-[32px] sm:text-[40px] md:text-[50px] font-bold mb-3">
            Cotizador
          </h1>
          <p className="text-[20px] sm:text-[28px] md:text-[36px] text-[#97D22A] font-semibold leading-snug">
            Haz la cotización de tu adelanto de salario <br className="hidden sm:block" />
            con nuestro cotizador
          </p>
        </div>

        {/* Card principal */}
        <Card className="shadow-xl">
          <CardHeader className="bg-muted/50 text-center p-6">
            <p className="text-gray-700 text-[16px] sm:text-[18px] md:text-[20px] leading-snug mb-2">
              El monto mínimo a solicitar es de Q.500.00 y<br className="hidden sm:block" /> 
              el máximo es de Q.1,500.00.
            </p>
            <CardTitle className="text-[20px] sm:text-[22px] md:text-[24px]">
              Ingresa el monto de tu salário
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            {/* Input */}
            <div className="space-y-2">
              <Label htmlFor="salary" className="text-base sm:text-lg font-semibold">
                Ingresa el monto de tu salario
              </Label>
              <Input
                id="salary"
                type="number"
                placeholder="0.00"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="text-lg sm:text-xl h-12 sm:h-14"
              />
              {error && (
                <p className="text-red-500 text-sm sm:text-base font-semibold">{error}</p>
              )}
            </div>

            {/* Botón */}
            <Button
              onClick={handleCalculate}
              className="w-full bg-[#97D22A] hover:bg-[#86C120] h-12 sm:h-14 text-[20px] sm:text-[24px] font-semibold cursor-pointer uppercase transition"
            >
              Calcular
            </Button>

            {/* Resultado */}
            {result && (
              <div className="space-y-5 pt-6 border-t">
                <Card className="border-[#97D22A] border-2 bg-[#F9FFF5] p-5 sm:p-6 rounded-lg">
                  <h3 className="text-[#97D22A] text-lg sm:text-xl font-bold mb-4 text-center">
                    Monto solicitado: {formatCurrency(result.montoSolicitado)}
                  </h3>

                  <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                    <span>Monto solicitado:</span>
                    <span>{formatCurrency(result.montoSolicitado)}</span>
                  </div>
                  <div className="flex justify-between text-red-500 text-sm sm:text-base">
                    <span>Comisión (5%):</span>
                    <span>-{formatCurrency(result.comision)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                    <span>Total a recibir:</span>
                    <span className="font-semibold text-[#97D22A]">
                      {formatCurrency(result.totalRecibir)}
                    </span>
                  </div>
                  <div className="flex justify-between text-black font-bold text-lg mt-2">
                    <span>Tu pago total:</span>
                    <span className="text-[#97D22A]">
                      {formatCurrency(result.totalPagar)}
                    </span>
                  </div>
                  <p className="text-center text-[#017EFF] mt-3 font-semibold cursor-pointer text-sm sm:text-base">
                    Monto máximo que te podemos ofrecer.
                  </p>

                  {/* Cuadro informativo */}
                  <div className="mt-5 bg-[#F7FAF0] border border-[#D6E8B0] rounded-xl p-4 sm:p-5">
                    <div className="flex items-center mb-2 text-[#797979] font-semibold text-[16px] sm:text-[18px]">
                      <Info className="w-5 h-5 mr-2 text-gray-500" />
                      ¿Por qué elegir QuincenaToGo?
                    </div>
                    <ul className="text-[#797979] text-[14px] sm:text-[16px] space-y-1 pl-6 list-disc font-light">
                      <li>✅ Aprobación ágil</li>
                      <li>✅ Te depositamos tu dinero en tu cuenta</li>
                      <li>✅ 100% digital y seguro</li>
                      <li>✅ Sin papeleos ni filas</li>
                    </ul>
                  </div>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
