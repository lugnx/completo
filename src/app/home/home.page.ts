import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon, IonButtons, IonButton, IonFooter, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personCircle, 
  menuOutline, 
  checkmarkCircle, 
  alertCircle, 
  call,
  create 
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle,
    IonContent, IonIcon, IonButtons, 
    IonButton, IonFooter, IonGrid, IonRow, IonCol
  ],
})

export class HomePage {
  
  mensajeSeleccionado: string = ''; // Variable para guardar el mensaje
  mensajeNumero: number = 0;

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {
    addIcons({
      personCircle,
      menuOutline,
      checkmarkCircle,
      alertCircle,
      call,
      create
    });
  }

  // 4. Esta función AHORA selecciona Y ENVÍA el mensaje
  seleccionarMensaje(numero: number) {
    this.mensajeNumero = numero; // Guardamos el número

    if (numero === 1) {
      this.mensajeSeleccionado = "Hola, llegue a mi destino me encuentro bien.";
    } else if (numero === 2) {
      this.mensajeSeleccionado = "¡Necesito ayuda!, ven a buscarme";
    } else if (numero === 3) {
      this.mensajeSeleccionado = "Marcame en cuanto veas este mensaje";
    }
    
    // --- ¡ESTE ES EL CAMBIO! ---
    // En lugar de solo mostrar 'Mensaje seleccionado',
    // ahora ejecutamos la lógica de envío inmediatamente.
    console.log('Enviando mensaje:', this.mensajeSeleccionado);
    this.mostrarToast('Mensaje enviado correctamente');
  }

  // 5. Esta función se llama al presionar "Enviar"
  enviar() {
    // AHORA, esta función solo volverá a enviar el último mensaje...
    // o te dirá que selecciones uno si la app recién cargó.
    if (this.mensajeSeleccionado) {
      console.log('Enviando mensaje (DE NUEVO):', this.mensajeSeleccionado);
      this.mostrarToast('Mensaje enviado (otra vez)');
    } else {
      this.mostrarToast('Por favor, selecciona un mensaje primero');
    }
  }

  // 6. Esta función se llama al presionar "Personalizar"
  personalizar() {
    console.log('Navegando a chat...');
    this.router.navigate(['/chat']);
  }

  // 7. Esta es una función "ayudante" para mostrar los mensajes
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // 2 segundos
      position: 'middle',
      cssClass: 'toast-centro',
      color: 'success',
      buttons: [
        {
          icon: 'checkmark-circle',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }
}