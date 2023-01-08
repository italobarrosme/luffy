import { useStoreModal } from '@/store/useStoreModal'
import { Icon } from '@iconify/react'
import { useRef,  } from 'react'
import { useOnClickOutside } from 'usehooks-ts'


type ModalProps = {
  title?: string,
  children: JSX.Element,
  role: string
}

export const Modal = ({
  children,
  role,
  title = 'Modal'
}: ModalProps) => {

  const { store, setModal } = useStoreModal()

  const isOpen = store.modal.role === role && store.modal.isOpen

  const modalRef = useRef(null)

  useOnClickOutside(modalRef, () => handlerCloseModal())

  const handlerCloseModal = () => {
    setModal({
      role: '',
      isOpen: false,
    })
  }

  return isOpen ? (
    <div ref={modalRef} id={role} className='fixed top-0 left-0 w-full h-full bg-black/[0.65] z-[45]' >
      <div className='fixed top-[15%] left-[15%] w-[75%] h-[75%] bg-brand-primary text-white rounded-lg z-[50] p-4 shadow-xl'>
        <div className='h-full overflow-y-auto'>
          <div className='flex gap-4'>
            <h2 className='text-2xl font-semibold leading-tight w-full my-4'>{title}</h2>
            <button onClick={handlerCloseModal} className=''>
              <Icon icon={'mdi:close-circle'} width={24} height={24} />
            </button>
          </div>
          <div className='flex-col gap-4 p-4'>
            {children}
          </div>
        </div>
      </div>
    </div>
  ) : null
} 