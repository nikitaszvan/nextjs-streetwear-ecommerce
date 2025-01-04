// types/relations.ts

export namespace AppRelations {
    // Relationship Types
    export type RelationshipTypes = {
      uses: string[];      // Dependencies/hooks used
      triggers: string[];  // Actions/APIs triggered
      displays: string[];  // UI elements/data displayed
    }
  
    // Component Relations
    export interface ComponentRelations extends RelationshipTypes {
      UploadComponent: {
        uses: ['useImageUpload', 'addCategoryImages'];
        triggers: ['POST /api/upload'];
        displays: ['upload status', 'loading indicator'];
      };
      
      CategoryDisplay: {
        uses: ['useCategoryImages'];
        triggers: ['GET /api/images'];
        displays: ['category list', 'image grid'];
      };
    }
  
    // Hook Relations
    export interface HookRelations extends RelationshipTypes {
      useImageUpload: {
        uses: ['addCategoryImages'];
        triggers: ['POST /api/upload'];
        displays: ['upload progress'];
      };
  
      useCategoryImages: {
        uses: ['DynamoDB'];
        triggers: ['GET /api/images'];
        displays: ['image results'];
      };
    }
  
    // API Relations
    export interface APIRelations extends RelationshipTypes {
      'POST /api/upload': {
        uses: ['addCategoryImages', 'DynamoDB'];
        triggers: ['database write'];
        displays: ['success/error message'];
      };
  
      'GET /api/images': {
        uses: ['DynamoDB'];
        triggers: ['database read'];
        displays: ['image data'];
      };
    }
  
    // Data Types
    export interface CategoryImageInput {
      category: string;
      images: string[];
    }
  
    export interface UploadResponse {
      message: string;
      success: true;
    }
  
    export interface UploadError {
      error: string;
      status: number;
    }
  
    // Complete System Map
    export interface SystemMap {
      components: ComponentRelations;
      hooks: HookRelations;
      api: APIRelations;
      database: {
        tables: {
          'ecommerce-product-images': {
            uses: ['DynamoDB Client'];
            triggers: ['write operations', 'read operations'];
            displays: ['stored image data'];
          };
        };
      };
    }
  }
  
//   // Usage Example:
//   type UploadComponentRelations = AppRelations.ComponentRelations['UploadComponent'];
//   type ImageUploadHookRelations = AppRelations.HookRelations['useImageUpload'];