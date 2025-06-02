"use client";

import { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import InputForm from "./InputForm";
import FormMessage from "./FormMessage";

function InputFormGroup() {
  // インプットフォーム切り替え用state
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // バリデーションをかける
  const { handleFormSubmit, error, success, isPending, setError, setSuccess } =
    useFormSubmit(isRegisterMode);

  return (
    <div className="flex gap-3 w-3/5 items-center relative">
      <div className="flex gap-3 items-center w-full">
        {/* トグルスイッチ */}
        <ToggleSwitch
          isRegisterMode={isRegisterMode}
          setIsRegisterMode={setIsRegisterMode}
        />

        {/* インプットフォーム */}
        <InputForm
          isRegisterMode={isRegisterMode}
          isPending={isPending}
          handleFormSubmit={handleFormSubmit}
        />
      </div>

      {/* エラーメッセージ等表示部分 */}
      <FormMessage 
        error={error}
        setError={setError}
        success={success}
        setSuccess={setSuccess}
      />
    </div>
  );
}

export default InputFormGroup;
