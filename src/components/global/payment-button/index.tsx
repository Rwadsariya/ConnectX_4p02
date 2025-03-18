import { Button } from '@/components/ui/button'
 import { useSubscription } from '@/hooks/use-Subscription'
import { CreditCardIcon, Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

const PaymentButton = (props: Props) => {
   const { onSubscribe, isProcessing } = useSubscription()
  return (
    <Button
       disabled={isProcessing}
        onClick={onSubscribe}
      className="bg-gradient-to-br
     text-white 
     rounded-full 
    from-[#6f5db8] 
    via-[#9434E6] 
    font-bold 
    to-[#CC3BD4]"
    >
      {isProcessing ? <Loader2 className="animate-spin" /> : <CreditCardIcon />} 
      Upgrade
    </Button>
  )
}

export default PaymentButton
