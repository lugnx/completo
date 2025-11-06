import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Para leer parámetros de la ruta

// Importar TODOS los componentes de Ionic que usamos
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonFooter,
  IonTextarea,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  sendOutline, 
  menuOutline, 
  personCircle, 
  alertCircle, 
  navigate, 
  location, 
  checkmarkDone, 
  send 
} from 'ionicons/icons';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'], // Lo dejaremos vacío, pero no lo borres
  standalone: true,
  
  // Agregar TODOS los imports aquí
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonFooter,
    IonTextarea,
    IonBackButton,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class ChatPage implements OnInit {
  contactName: string = 'Usuario'; // Nombre por defecto o el que se pasa
  messageInput: string = ''; // Para el texto que se escribe

  // Constructor con ActivatedRoute
  constructor(private activatedRoute: ActivatedRoute) {
    // Registrar los iconos que usamos
    addIcons({ 
      sendOutline, 
      menuOutline, 
      personCircle, 
      alertCircle, 
      navigate, 
      location, 
      checkmarkDone, 
      send 
    });
  }

  ngOnInit() {
    // Leer el parámetro 'id' (nombre del contacto) de la URL
    this.activatedRoute.paramMap.subscribe(params => {
      this.contactName = params.get('id') || 'Usuario'; // 'Usuario' si no se pasa nada
    });
  }

  // Puedes añadir funciones para enviar mensajes, ubicación, etc.
  enviarMensaje() {
    console.log('Enviando mensaje:', this.messageInput);
    // Aquí iría la lógica para añadir el mensaje a la conversación
    this.messageInput = ''; // Limpiar el input después de enviar
  }

  enviarUbicacion() {
    console.log('Enviando ubicación...');
    // Lógica para obtener y enviar la ubicación
  }
}